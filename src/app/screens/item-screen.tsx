import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../context/cart-context";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { foodItems } from "../data/food-data";

export function ItemScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const item = foodItems.find(item => item.id === id) || foodItems[0];

  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [selectedPortionIndex, setSelectedPortionIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const basePrice = item.price;
  const portionExtra = item.customizations.portionOptions[selectedPortionIndex].price;
  const pricePerItem = basePrice + portionExtra;
  const finalPrice = pricePerItem * quantity;

  const handleCustomizationToggle = (customization: string) => {
    setSelectedCustomizations(prev =>
      prev.includes(customization)
        ? prev.filter(c => c !== customization)
        : [...prev, customization]
    );
  };

  const handleAddToCart = () => {
    const customizations: string[] = [...selectedCustomizations];
    if (selectedPortionIndex > 0) {
      customizations.push(item.customizations.portionOptions[selectedPortionIndex].name);
    }

    addToCart({
      id: Date.now().toString(),
      name: item.name,
      price: pricePerItem,
      image: item.image,
      customizations,
      quantity: quantity,
      restaurantName: item.restaurantName,
    });

    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header Image */}
      <div className="relative">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={() => navigate("/home")}
          className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Title and Price */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <p className="text-gray-600 mt-1">{item.restaurantName}</p>
          <p className="text-orange-600 text-xl font-bold mt-2">
            RM {pricePerItem.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {item.description}
          </p>
        </div>

        {/* Customization Section */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Customize Your Order</h2>

            <div className="space-y-4">
              {item.customizations.checkboxes.map((customization) => (
                <div key={customization} className="flex items-center space-x-2">
                  <Checkbox
                    id={customization}
                    checked={selectedCustomizations.includes(customization)}
                    onCheckedChange={() => handleCustomizationToggle(customization)}
                  />
                  <Label
                    htmlFor={customization}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {customization}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Portion Size */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold mb-3">Portion Size</h3>
            <RadioGroup
              value={selectedPortionIndex.toString()}
              onValueChange={(value) => setSelectedPortionIndex(parseInt(value))}
            >
              {item.customizations.portionOptions.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value={index.toString()} id={`portion-${index}`} />
                  <Label htmlFor={`portion-${index}`} className="text-sm font-normal cursor-pointer">
                    {option.name}
                    {option.price > 0 && ` (+RM ${option.price.toFixed(2)})`}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Quantity */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 p-4">
        <Button
          onClick={handleAddToCart}
          className="w-full h-12 bg-orange-600 hover:bg-orange-700"
        >
          Add to Cart - RM {finalPrice.toFixed(2)}
        </Button>
      </div>
    </div>
  );
}