"use client";

import React, { useState } from 'react';
import { Checkbox } from '~/components/ui/checkbox';

const TosChecked = () => {
    const [checked, setChecked] = useState(false);

    return (
        <div className="items-top flex space-x-2 mt-8 container mx-auto p-8">
            <Checkbox
                id="terms1"
                checked={checked}
                onCheckedChange={(value: boolean) => {
                    setChecked(value);
                }}
            />
            <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none">
                    Accept terms and conditions
                </label>
                <p className="text-sm text-muted-foreground">
                    You agree to our Terms of Service.
                </p>
            </div>
        </div>
    );
};

export default TosChecked;

