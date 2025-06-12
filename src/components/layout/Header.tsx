import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export function Header() {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [size, setSize] = useState('');
  const [serial, setSerial] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [date] = useState(() => new Date().toLocaleDateString());

  //TODO: Placeholder options (replace with DB data)
  const manufacturers = ['Gin', 'Ozone', 'Nova'];
  const models = ['Bonanza 2', 'Rush 5', 'Mentor 7'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <Card className="w-full mb-4">
      <CardContent className="flex flex-wrap gap-4 items-end justify-between p-4">
        <div className="flex flex-col gap-2 min-w-[180px]">
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <select
            id="manufacturer"
            value={manufacturer}
            onChange={e => setManufacturer(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Select</option>
            {manufacturers.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 min-w-[180px]">
          <Label htmlFor="model">Model</Label>
          <select
            id="model"
            value={model}
            onChange={e => setModel(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Select</option>
            {models.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 min-w-[100px]">
          <Label htmlFor="size">Size</Label>
          <select
            id="size"
            value={size}
            onChange={e => setSize(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Select</option>
            {sizes.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 min-w-[160px]">
          <Label htmlFor="serial">Serial Number</Label>
          <Input
            id="serial"
            value={serial}
            onChange={e => setSerial(e.target.value)}
            placeholder="Enter serial number"
          />
        </div>
        <div className="flex flex-col gap-2 min-w-[160px]">
          <Label>Date of Service</Label>
          <div className="border rounded px-2 py-1 bg-gray-100">{date}</div>
        </div>
        <div className="flex flex-col gap-2 min-w-[180px]">
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            placeholder="Enter client name"
          />
        </div>
        <div className="flex flex-col gap-2 min-w-[180px]">
          <Label htmlFor="clientContact">Client Contact</Label>
          <Input
            id="clientContact"
            value={clientContact}
            onChange={e => setClientContact(e.target.value)}
            placeholder="Enter contact info"
          />
        </div>
      </CardContent>
    </Card>
  );
} 