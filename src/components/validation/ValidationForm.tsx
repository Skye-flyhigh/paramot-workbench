import { useState, useEffect, FormEvent } from 'react';
import '../../types/electron.d.ts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { GliderSelector } from './GliderSelector';

export function ValidationForm() {
  const [selectedGlider, setSelectedGlider] = useState<{
    brand: string;
    model: string;
    size: string;
  } | null>(null);
  const [gliderData, setGliderData] = useState<any>(null);
  const [measured, setMeasured] = useState<any>({});
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch glider data when selection changes
  useEffect(() => {
    const fetchGliderData = async () => {
      if (!selectedGlider) return;

      try {
        if (!window.electron?.getGliderData) {
          throw new Error('Electron API not available');
        }

        setIsLoading(true);
        setError(null);
        const data = await window.electron.getGliderData(
          selectedGlider.brand,
          selectedGlider.model,
          selectedGlider.size
        );

        if (!data) {
          setError('No data found for this glider configuration');
          return;
        }

        setGliderData(data);
        if (data.lineset?.physicalLines) {
          const initial: Record<string, string> = {};
          data.lineset.physicalLines.forEach((line: any) => {
            initial[line.lineLabel] = '';
          });
          setMeasured(initial);
        }
      } catch (err) {
        console.error('Error fetching glider data:', err);
        setError('Failed to load glider data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGliderData();
  }, [selectedGlider]);

  const handleGliderSelection = (brand: string, model: string, size: string) => {
    setSelectedGlider({ brand, model, size });
  };

  const handleMeasuredChange = (line: string, value: string) => {
    setMeasured((prev: Record<string, string>) => ({ ...prev, [line]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setResults({ status: 'pass', message: 'Validation not yet implemented.' });
      setIsLoading(false);
    }, 1000);
  };

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error Loading Data</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!gliderData) {
    return null;
  }

  const { lineset, lineLengths } = gliderData;
  const groupMap: Record<string, string[]> = {};
  lineset.groupMappings.forEach((gm: any) => {
    if (!groupMap[gm.groupLabel]) groupMap[gm.groupLabel] = [];
    groupMap[gm.groupLabel].push(
      lineset.physicalLines.find((pl: any) => pl.id === gm.physicalLineId)?.lineLabel
    );
  });

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Glider Validation</CardTitle>
        <CardDescription>
          Select glider and enter measured values for each line.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <GliderSelector onSelectionChange={handleGliderSelection} />

          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          {gliderData && (
            <>
              {Object.entries(groupMap).map(([group, lines]) => (
                <div key={group} className="border rounded p-4 mb-4">
                  <h3 className="font-semibold mb-2">Group {group}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lines.map(line => (
                      <div key={line} className="space-y-1">
                        <Label htmlFor={`measured-${line}`}>
                          {line} (Manufacturer: {findManufacturerLength(line, lineLengths)} mm)
                        </Label>
                        <Input
                          id={`measured-${line}`}
                          type="number"
                          value={measured[line] || ''}
                          onChange={e => handleMeasuredChange(line, e.target.value)}
                          placeholder="Enter measured length (mm)"
                          inputMode="decimal"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Validating...' : 'Validate Glider'}
              </Button>
            </>
          )}

          {results && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Validation Results</h3>
              <Alert variant={results.status === 'pass' ? 'default' : 'destructive'}>
                <AlertTitle>{results.status.toUpperCase()}</AlertTitle>
                <AlertDescription className="whitespace-pre-line">{results.message}</AlertDescription>
              </Alert>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

function findManufacturerLength(line: string, lineLengths: any) {
  if (!line || !lineLengths) return '';
  const type = line[0];
  const idx = parseInt(line.slice(1), 10) - 1;
  if (!lineLengths[type] || isNaN(idx)) return '';
  return lineLengths[type][idx] ?? '';
}
 