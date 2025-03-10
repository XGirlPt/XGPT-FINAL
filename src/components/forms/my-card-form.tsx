'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export const MyCardForm = () => {
  const [status, setStatus] = useState("I'm albina! come meet me");

  const handleSave = () => {
    console.log('Changes saved');
  };

  const handleDiscard = () => {
    console.log('Changes discarded');
  };

  return (
    <div className="w-full rounded-3xl bg-white dark:bg-transparent dark:border dark:border-gray-800 dark:border-opacity-50 p-4 md:p-8">
      {/* Header with title and buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold">My Card</h1>
          <Separator className="my-3 md:my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 md:hidden" />
        </div>
        <div className="w-full md:w-auto flex justify-between md:justify-end space-x-4 mt-3 md:mt-0">
          <Button
            className="rounded-full"
            variant="outline"
            onClick={handleDiscard}
          >
            Discard
          </Button>
          <Button
            className="bg-darkpink hover:bg-darkpinkhover text-white rounded-full"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
      <Separator className="my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 hidden md:block" />

      {/* Main Content Container */}
      <div className="md:flex md:gap-8 mt-4">
        {/* Mobile Card */}

        {/* Desktop Card */}
        <div className="w-full">
          <div className="sm:flex sm:flex-row flex-col gap-8">
            {/* Left side (profile card) */}
            <Card className="rounded-3xl border-gray-200 bg-[#f2ebee] dark:bg-transparent dark:border dark:border-gray-800 dark:border-opacity-50 overflow-hidden w-auto">
              <div className="relative p-4">
                <Image
                  src="/models/accounts/1.png"
                  alt="Profile"
                  className="w-full h-48 object-cover rounded-2xl"
                  width={320}
                  height={256}
                />
                <Button
                  size="icon"
                  className="absolute bottom-6 right-6 bg-darkpink hover:bg-darkpink/20 text-white rounded-full w-10 h-10"
                >
                  <Image
                    src="/icons/edit-icon.svg"
                    alt="Edit"
                    width={20}
                    height={20}
                  />
                </Button>
              </div>

              <CardContent className="p-4 flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Abella Danger</h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Profile View: </span>
                    <span className="font-medium ml-1">345</span>
                  </div>
                </div>

                <div className="mt-1">
                  <Badge
                    variant="outline"
                    className=" border-none flex items-center"
                  >
                    <Image
                      src="/icons/location.svg"
                      alt="Vago"
                      width={24}
                      height={24}
                    />
                    <span className="text-lg mr-1 font-medium">Vagos</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Right side (state info) */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-6 sm:mt-0 mt-6">
                State Info
              </h3>

              <div>
                <p className="text-gray-500 mb-2">Current State</p>
                <div className="bg-[#f2ebee] dark:bg-[#271a1f] dark:border dark:border-gray-800 dark:border-opacity-50 rounded-full p-3 mb-6 text-sm">
                  <p>Hi cute! can you come keep me company?</p>
                </div>
              </div>

              <div>
                <p className="text-gray-500 mb-2">Update Status</p>
                <div className="flex gap-2 rounded-full bg-[#f2ebee] dark:bg-[#271a1f] dark:border dark:border-gray-800 dark:border-opacity-50 p-1">
                  <Input
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="flex-1 bg-transparent border-none rounded-full "
                    placeholder="Enter your status"
                  />
                  <Button className="bg-darkpink hover:bg-darkpink/20 text-white rounded-full px-6">
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCardForm;
