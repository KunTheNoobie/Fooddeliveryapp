import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Star } from "lucide-react";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (foodRating: number, riderRating: number, comment: string) => void;
  restaurantName: string;
  riderName: string;
  existingRating?: { foodRating?: number; riderRating?: number; comment?: string };
  readonly?: boolean;
}

export function RatingModal({
  isOpen,
  onClose,
  onSubmit,
  restaurantName,
  riderName,
  existingRating,
  readonly = false,
}: RatingModalProps) {
  const [foodRating, setFoodRating] = useState(existingRating?.foodRating || 0);
  const [riderRating, setRiderRating] = useState(existingRating?.riderRating || 0);
  const [comment, setComment] = useState(existingRating?.comment || "");
  const [hoveredFoodStar, setHoveredFoodStar] = useState(0);
  const [hoveredRiderStar, setHoveredRiderStar] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (readonly) return;
    if (foodRating > 0 && riderRating > 0) {
      onSubmit(foodRating, riderRating, comment);
      onClose();
    }
  };

  const renderStars = (
    rating: number,
    setRating: (rating: number) => void,
    hoveredStar: number,
    setHoveredStar: (star: number) => void
  ) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !readonly && setRating(star)}
            onMouseEnter={() => !readonly && setHoveredStar(star)}
            onMouseLeave={() => !readonly && setHoveredStar(0)}
            className={`focus:outline-none transition-transform ${!readonly ? "hover:scale-110" : "cursor-default"}`}
          >
            <Star
              className={`w-8 h-8 ${star <= (hoveredStar || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
                }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-6">Rate Your Experience</h2>

        {/* Food Rating */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">How was the food?</h3>
          <p className="text-sm text-gray-600 mb-3">{restaurantName}</p>
          {renderStars(foodRating, setFoodRating, hoveredFoodStar, setHoveredFoodStar)}
        </div>

        {/* Rider Rating */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">How was the delivery?</h3>
          <p className="text-sm text-gray-600 mb-3">{riderName}</p>
          {renderStars(riderRating, setRiderRating, hoveredRiderStar, setHoveredRiderStar)}
        </div>

        {/* Comment */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Additional Comments (Optional)</h3>
          <Textarea
            placeholder="Tell us more about your experience..."
            value={comment}
            onChange={(e) => !readonly && setComment(e.target.value)}
            rows={4}
            className="resize-none"
            readOnly={readonly}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            {readonly ? "Close" : "Skip"}
          </Button>
          {!readonly && (
            <Button
              className="flex-1 bg-orange-600 hover:bg-orange-700"
              onClick={handleSubmit}
              disabled={foodRating === 0 || riderRating === 0}
            >
              Submit Rating
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
