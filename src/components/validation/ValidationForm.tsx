import { useState, ChangeEvent, FormEvent } from 'react';
import { validationService } from '@/lib/validation/service';
import type { ValidationResult, GliderValidationContext } from '@/lib/validation/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LineMeasurements {
  [key: string]: number;
}

export function ValidationForm() {
  const [context, setContext] = useState<GliderValidationContext>({
    manufacturer: '',
    model: '',
    serialNumber: '',
  });
  const [measurements, setMeasurements] = useState<LineMeasurements>({
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
    C1: 0,
    C2: 0,
    D1: 0,
    D2: 0,
  });
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const validationResults = await validationService.validateGlider({
        ...context,
        measurements,
      });
      setResults(validationResults);
    } catch (error) {
      console.error('Validation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id in measurements) {
      setMeasurements(prev => ({ ...prev, [id]: Number(value) || 0 }));
    } else {
      setContext(prev => ({ ...prev, [id]: value }));
    }
  };

  const renderLineInputs = (lineSet: string) => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor={`${lineSet}1`}>{`${lineSet}1 Length (mm)`}</Label>
        <Input
          id={`${lineSet}1`}
          type="number"
          value={measurements[`${lineSet}1`]}
          onChange={handleInputChange}
          placeholder="Enter length"
          required
          inputMode="decimal"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${lineSet}2`}>{`${lineSet}2 Length (mm)`}</Label>
        <Input
          id={`${lineSet}2`}
          type="number"
          value={measurements[`${lineSet}2`]}
          onChange={handleInputChange}
          placeholder="Enter length"
          required
          inputMode="decimal"
        />
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Glider Validation</CardTitle>
        <CardDescription>Enter glider details and measurements to begin validation</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input
                id="manufacturer"
                value={context.manufacturer}
                onChange={handleInputChange}
                placeholder="Enter manufacturer"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={context.model}
                onChange={handleInputChange}
                placeholder="Enter model"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                id="serialNumber"
                value={context.serialNumber}
                onChange={handleInputChange}
                placeholder="Enter serial number"
                required
              />
            </div>
          </div>

          <Tabs defaultValue="A" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="A">A-Lines</TabsTrigger>
              <TabsTrigger value="B">B-Lines</TabsTrigger>
              <TabsTrigger value="C">C-Lines</TabsTrigger>
              <TabsTrigger value="D">D-Lines</TabsTrigger>
            </TabsList>
            <TabsContent value="A" className="space-y-4">
              {renderLineInputs('A')}
            </TabsContent>
            <TabsContent value="B" className="space-y-4">
              {renderLineInputs('B')}
            </TabsContent>
            <TabsContent value="C" className="space-y-4">
              {renderLineInputs('C')}
            </TabsContent>
            <TabsContent value="D" className="space-y-4">
              {renderLineInputs('D')}
            </TabsContent>
          </Tabs>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Validating...' : 'Validate Glider'}
          </Button>
        </form>

        {results.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Validation Results</h3>
            {results.map((result, index) => (
              <Alert key={index} variant={result.status === 'pass' ? 'default' : 'destructive'}>
                <AlertTitle>{result.status.toUpperCase()}</AlertTitle>
                <AlertDescription className="whitespace-pre-line">{result.message}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 