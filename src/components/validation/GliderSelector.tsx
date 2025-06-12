import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GliderSelectorProps {
  onSelectionChange: (brand: string, model: string, size: string) => void;
}

export function GliderSelector({ onSelectionChange }: GliderSelectorProps) {
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState({
    brands: true,
    models: false,
    sizes: false,
  });

  // Fetch available brands on mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        if (!window.electron?.getAvailableBrands) {
          throw new Error('Electron API not available');
        }
        const availableBrands = await window.electron.getAvailableBrands();
        setBrands(availableBrands);
        if (availableBrands.length > 0) {
          setSelectedBrand(availableBrands[0]);
        }
      } catch (err) {
        console.error('Error fetching brands:', err);
        setError('Failed to load available brands');
      } finally {
        setIsLoading(prev => ({ ...prev, brands: false }));
      }
    };

    fetchBrands();
  }, []);

  // Fetch models when brand changes
  useEffect(() => {
    const fetchModels = async () => {
      if (!selectedBrand) return;
      
      try {
        setIsLoading(prev => ({ ...prev, models: true }));
        setError(null);
        if (!window.electron?.getModelsForBrand) {
          throw new Error('Electron API not available');
        }
        const availableModels = await window.electron.getModelsForBrand(selectedBrand);
        setModels(availableModels);
        if (availableModels.length > 0) {
          setSelectedModel(availableModels[0]);
        } else {
          setSelectedModel('');
          setSelectedSize('');
          setSizes([]);
        }
      } catch (err) {
        console.error('Error fetching models:', err);
        setError('Failed to load available models');
      } finally {
        setIsLoading(prev => ({ ...prev, models: false }));
      }
    };

    fetchModels();
  }, [selectedBrand]);

  // Fetch sizes when model changes
  useEffect(() => {
    const fetchSizes = async () => {
      if (!selectedBrand || !selectedModel) return;
      
      try {
        setIsLoading(prev => ({ ...prev, sizes: true }));
        setError(null);
        if (!window.electron?.getSizesForModel) {
          throw new Error('Electron API not available');
        }
        const availableSizes = await window.electron.getSizesForModel(selectedBrand, selectedModel);
        setSizes(availableSizes);
        if (availableSizes.length > 0) {
          setSelectedSize(availableSizes[0]);
        } else {
          setSelectedSize('');
        }
      } catch (err) {
        console.error('Error fetching sizes:', err);
        setError('Failed to load available sizes');
      } finally {
        setIsLoading(prev => ({ ...prev, sizes: false }));
      }
    };

    fetchSizes();
  }, [selectedBrand, selectedModel]);

  // Notify parent component of selection changes
  useEffect(() => {
    if (selectedBrand && selectedModel && selectedSize) {
      onSelectionChange(selectedBrand, selectedModel, selectedSize);
    }
  }, [selectedBrand, selectedModel, selectedSize, onSelectionChange]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="brand">Brand</Label>
        <Select
          value={selectedBrand}
          onValueChange={setSelectedBrand}
          disabled={isLoading.brands}
        >
          <SelectTrigger id="brand">
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.map(brand => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="model">Model</Label>
        <Select
          value={selectedModel}
          onValueChange={setSelectedModel}
          disabled={isLoading.models || !selectedBrand}
        >
          <SelectTrigger id="model">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            {models.map(model => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="size">Size</Label>
        <Select
          value={selectedSize}
          onValueChange={setSelectedSize}
          disabled={isLoading.sizes || !selectedModel}
        >
          <SelectTrigger id="size">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {sizes.map(size => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 