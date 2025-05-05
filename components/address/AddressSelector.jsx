"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function AddressSelector() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchRegions = async () => {
      const res = await fetch("/regions.json");
      const data = await res.json();
      setRegions(data.states);
    };

    fetchRegions();
  }, []);

  const selectedRegionData = regions.find((r) => r.value === selectedRegion);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full">
        <label className="text-sm mb-1 block text-muted-foreground">
          Region
        </label>
        <Select
          onValueChange={(val) => {
            setSelectedRegion(val);
            setSelectedCity("");
          }}
          value={selectedRegion}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <label className="text-sm mb-1 block text-muted-foreground">City</label>
        <Select
          onValueChange={setSelectedCity}
          value={selectedCity}
          disabled={!selectedRegion}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            {(selectedRegionData?.cities || []).map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
