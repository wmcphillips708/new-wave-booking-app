
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Full JSX content as provided by user earlier (truncated for brevity in preview)
export default function QuoteAndBookingPage() {
  const [address, setAddress] = useState("");
  const addressRef = useRef(null);
  const [stories, setStories] = useState("1");
  const [windowCount, setWindowCount] = useState(10);
  const [lastCleaned, setLastCleaned] = useState("");
  const [cleaningType, setCleaningType] = useState("");
  const [screensCleaned, setScreensCleaned] = useState("");
  const [sillsTracksCleaned, setSillsTracksCleaned] = useState("");
  const [quote, setQuote] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const calculateQuote = () => {
    if (!address.trim()) {
      setError("Address is required.");
      return;
    }

    setError("");

    const perSidePrice = 10;
    const slidingDoorSidePrice = 30;
    const screenPrice = 3;

    const sides = cleaningType === "both" ? 2 : (cleaningType === "interior" || cleaningType === "exterior" ? 1 : 0);
    const storyCount = parseInt(stories);
    const slidingDoors = parseInt(document.getElementById("sliding-doors")?.value || 0);
    const screenCount = screensCleaned === "yes" ? windowCount : 0;

    const interiorMultiplier = cleaningType === "interior" ? 0.5 : (cleaningType === "both" ? 1.5 : 1);
    const windowBase = windowCount * perSidePrice * interiorMultiplier;
    const doorBase = slidingDoors * slidingDoorSidePrice * sides;
    const screenBase = screenCount * screenPrice;
    const multiStoryFee = storyCount > 1 ? Math.ceil(windowCount * 0.5) * 5 + (storyCount - 1) * 20 : 0;

    const total = windowBase + doorBase + screenBase + multiStoryFee;
    setQuote(total);
  };

  const handleBookingSubmit = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !selectedTime) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  useEffect(() => {
    if (window.google && addressRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, {
        types: ["address"],
        componentRestrictions: { country: "us" }
      });
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setAddress(place.formatted_address || "");
      });
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6 bg-[#F5F8FA] text-[#1F2D3D] rounded-2xl shadow-xl border border-[#D0D7DE]">
      <Card className="bg-white rounded-2xl shadow-md">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">1 Minute Window Cleaning Quote</h2>
          <Label htmlFor="address">Enter Address</Label>
          <Input id="address" type="text" value={address} ref={addressRef} onChange={(e) => setAddress(e.target.value)} required />
          ...
          {/* Code continues */}
        </CardContent>
      </Card>
    </div>
  );
}
