"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Lock, Zap, CheckCircle2 } from "lucide-react"

type PropertySpecs = {
  bedrooms: number
  bathrooms: number
  propertySize: string
  yearBuilt: string
  location: string
  predictor: string
}

export default function PropertyValuationForm() {
  const [specs, setSpecs] = useState<PropertySpecs>({
    bedrooms: 3,
    bathrooms: 1,
    propertySize: "2575",
    yearBuilt: "1975",
    location: "",
    predictor: "predictor-1",
  })

  const [predictedValue, setPredictedValue] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getModelName = (predictor: string) => {
    switch (predictor) {
      case "predictor-1":
        return "Linear Regression"
      case "predictor-2":
        return "Random Forest Regression"
      default:
        return "Linear Regression"
    }
  }

  const handleCalculate = async () => {
    if (!specs.location) {
      setError("Please select a location")
      return
    }
    setError(null)
    setIsCalculating(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predict?model=${specs.predictor === "predictor-1" ? "lr" : "rf"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Size_sqft: Number(specs.propertySize),
            Bedrooms: specs.bedrooms,
            Bathrooms: specs.bathrooms,
            YearBuilt: Number(specs.yearBuilt),
            Location: specs.location.charAt(0).toUpperCase() + specs.location.slice(1),
          }),
        }
      )

      const data = await res.json()
      if (res.ok) {
        setPredictedValue(data.prediction)
      } else {
        setError(data.error || "Failed to get prediction from backend")
      }
    } catch (err) {
      setError("Backend request failed")
      console.error(err)
    }

    setIsCalculating(false)
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="text-center space-y-2 mb-12">
        <h1 className="text-5xl font-bold text-foreground">House Price Prediction</h1>
        <p className="text-base text-muted-foreground">
          Professional-grade property assessment powered by advanced algorithms
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[45%_55%] gap-4">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <Card className="p-6 bg-white border shadow-sm">
              <h2 className="text-base font-bold text-foreground mb-6 border-l-4 border-primary pl-3">
                Property Specifications
              </h2>

              <div className="space-y-6">
                {/* Bedrooms */}
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Bedrooms</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <Button
                        key={num}
                        variant={specs.bedrooms === num ? "default" : "outline"}
                        className={`h-11 font-medium ${
                          specs.bedrooms === num
                            ? "bg-[#0044FD] hover:bg-[#0044FD]/90 text-white"
                            : "bg-white hover:bg-gray-50"
                        }`}
                        onClick={() => setSpecs({ ...specs, bedrooms: num })}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Bathrooms</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Button
                        key={num}
                        variant={specs.bathrooms === num ? "default" : "outline"}
                        className={`h-11 font-medium ${
                          specs.bathrooms === num
                            ? "bg-[#0044FD] hover:bg-[#0044FD]/90 text-white"
                            : "bg-white hover:bg-gray-50"
                        }`}
                        onClick={() => setSpecs({ ...specs, bathrooms: num })}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Property Size and Year Built */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertySize" className="text-sm font-semibold mb-2 block">
                      Property Size <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="propertySize"
                      type="number"
                      value={specs.propertySize}
                      onChange={(e) => setSpecs({ ...specs, propertySize: e.target.value })}
                      className="h-11 bg-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="yearBuilt" className="text-sm font-semibold mb-2 block">
                      Year Built <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="yearBuilt"
                      type="number"
                      value={specs.yearBuilt}
                      onChange={(e) => setSpecs({ ...specs, yearBuilt: e.target.value })}
                      className="h-11 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="text-sm font-semibold mb-2 block">
                      Location Selection <span className="text-red-500">*</span>
                    </Label>
                    <Select value={specs.location} onValueChange={(value) => setSpecs({ ...specs, location: value })}>
                      <SelectTrigger className="h-11 bg-white">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="city">City</SelectItem>
                        <SelectItem value="suburb">Suburb</SelectItem>
                        <SelectItem value="rural">Rural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="predictor" className="text-sm font-semibold mb-2 block">
                      Predictor Selection
                    </Label>
                    <Select value={specs.predictor} onValueChange={(value) => setSpecs({ ...specs, predictor: value })}>
                      <SelectTrigger className="h-11 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="predictor-1">Predictor-1 (Linear Regression)</SelectItem>
                        <SelectItem value="predictor-2">Predictor-2 (Random Forest)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/30 border border-blue-100/50">
              <Button
                onClick={handleCalculate}
                disabled={isCalculating}
                className="w-full h-14 text-base font-semibold bg-[#0044FD] hover:bg-[#0044FD]/90 text-white"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                {isCalculating ? "Calculating..." : "Get Professional Valuation"}
              </Button>

              {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

              <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4" />
                  <span>Instant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Accurate</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6 p-2">
            <Card className="p-6 bg-gradient-to-br from-purple-100/60 to-purple-50/40 border border-purple-200/50">
              <h3 className="text-base font-bold text-foreground mb-4 border-l-4 border-[#8513CC] pl-3">
                {specs.predictor === "predictor-1" ? "Predictor-1" : "Predictor-2"} Analysis
              </h3>

              <div className="text-center py-8">
                <div className="text-6xl font-bold mb-3 text-[#8513CC]">
                  {predictedValue !== null ? `$${predictedValue.toLocaleString()}` : "—"}
                </div>
                <div className="flex items-center justify-center gap-3 text-sm">
                  <span className="px-3 py-1 bg-[#8513CC]/20 rounded-full font-semibold text-[#8513CC]">
                    {specs.predictor === "predictor-1" ? "Predictor-1" : "Predictor-2"} Result
                  </span>
                  <span className="text-gray-600">• Market Value</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
