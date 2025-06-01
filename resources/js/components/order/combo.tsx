'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
type comboBoxType = {
    value: string;
    onChange: (value: string) => void;
    keyValuePair: Array<{ value: string; label: string }>;
    placeholder: string;
};

export function ComboboxDemo({ value, onChange, keyValuePair, placeholder }: comboBoxType) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen} modal={false}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-[200px] justify-between">
                    {value ? keyValuePair.find((f) => f.value === value)?.label : `Select ${placeholder}...`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" style={{ pointerEvents: 'auto' }}>
                <Command>
                    <CommandInput placeholder={`Search ${placeholder}`} />
                    <CommandList>
                        <CommandEmpty>No {placeholder} found.</CommandEmpty>
                        <CommandGroup>
                            {keyValuePair.map((k) => (
                                <CommandItem
                                    key={k.value}
                                    value={k.value}
                                    onSelect={() => {
                                        onChange(k.value);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={cn('mr-2 h-4 w-4', value === k.value ? 'opacity-100' : 'opacity-0')} />
                                    {k.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
