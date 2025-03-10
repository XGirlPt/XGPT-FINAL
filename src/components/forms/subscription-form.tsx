'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Circle, CreditCard } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '../ui/separator';
import { Plus } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { paymentHistoryData } from '../../backend/lib/payement-history';

export const SubscriptionForm = () => {
  return (
    <div className="w-full bg-white dark:bg-[#100007] dark:border-gray-800 dark:border dark:border-opacity-50 rounded-3xl p-4 md:p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">Plans & Subscription</h1>
        <Button className="text-darkpink bg-transparent hover:bg-transparent hover:text-darkpink">
          View All Plans
        </Button>
      </div>
      <Separator className="my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50" />

      <Tabs
        defaultValue="our-plans"
        orientation="vertical"
        className="flex flex-col md:flex-row gap-8"
      >
        <TabsList className="h-fit bg-transparent  flex flex-row md:flex-col p-0 md:w-64">
          <TabsTrigger
            value="our-plans"
            className="w-full justify-start text-black dark:text-white border-b-gray-200 dark:border-b-gray-900 px-4 py-3 data-[state=active]:text-darkpink data-[state=active]:border-b-gray-200 md:data-[state=active]:border-l-2 data-[state=active]:border-b-darkpink  md:data-[state=active]:border-l-darkpink data-[state=active]:bg-transparent "
          >
            Our Plans
          </TabsTrigger>
          <TabsTrigger
            value="payment-methods"
            className="w-full justify-start text-black dark:text-white border-b-gray-200 dark:border-b-gray-900  px-4 py-3 data-[state=active]:text-darkpink data-[state=active]:border-b-gray-200 md:data-[state=active]:border-l-2 data-[state=active]:border-b-darkpink  md:data-[state=active]:border-l-darkpink data-[state=active]:bg-transparent"
          >
            Payment Methods
          </TabsTrigger>
          <TabsTrigger
            value="payment-history"
            className="w-full justify-start text-black dark:text-white border-b-gray-200 dark:border-b-gray-900 px-4 py-3 data-[state=active]:text-darkpink data-[state=active]:border-b-gray-200 md:data-[state=active]:border-l-2 data-[state=active]:border-b-darkpink  md:data-[state=active]:border-l-darkpink data-[state=active]:bg-transparent"
          >
            Payment History
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          <TabsContent
            value="our-plans"
            className="mt-0 focus-visible:outline-none focus-visible:ring-0"
          >
            <div className="space-y-6">
              {/* Current Plan */}
              <Card className="border-none dark:bg-[#100007]">
                <CardHeader>
                  <CardTitle className="text-xl">Current Plan</CardTitle>
                </CardHeader>
                <CardContent className="bg-[#FFF5F8] dark:bg-[#27191f] rounded-3xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">
                        Premium Plan -{' '}
                        <span className="text-darkpink">$15/month</span>
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Next Monthly Date:15 November 2024
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-full border-darkpink dark:bg-transparent dark:text-white dark:border-white
                       dark:border-opacity-50 text-darkpink hover:bg-darkpink hover:text-white dark:hover:bg-gray-600"
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                  <h3 className="mb-2 font-medium">Subscription: EUR 10</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li className="flex items-center gap-3">
                      <Circle className="h-1.5 w-1.5 bg-black rounded-full" />
                      Monthly billing on the day of subscription.
                    </li>
                    <li className="flex items-center gap-3  ">
                      <Circle className="h-1.5 w-1.5 bg-black rounded-full" />
                      Cancellation at any time without additional fees.
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Our Packages */}
              <Card className="border-none w-full dark:bg-[#100007]">
                <CardHeader>
                  <CardTitle className="text-xl">Our Packages</CardTitle>
                </CardHeader>
                <CardContent className="grid w-full md:grid-cols-2 gap-4">
                  {/* Starter Package */}
                  <Card className="border-darkpink dark:bg-[#27191f] rounded-3xl">
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-2">Starter</h3>
                      <div className="flex justify-between items-center">
                        <div className="flex items-baseline mb-0">
                          <span className="text-4xl font-bold text-darkpink">
                            Free
                          </span>
                          <span className="text-gray-400 ml-2">/ Month</span>
                        </div>
                        <Badge className="text-xs font-normal text-darkpink dark:bg-white border-gray-200  rounded-full bg-transparent">
                          Current Plan
                        </Badge>
                      </div>
                      <Separator className="my-4 bg-gray-200 dark:bg-gray-800 dark:opacity-50" />
                      <div className="space-y-3">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <Check className="text-black bg-green-500 rounded-full h-4 w-4 p-0.5" />
                            <span>3 Social Media Account</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full dark:bg-transparent dark:text-white mt-6 rounded-full border-gray-200 dark:border-gray-800 dark:border-opacity-50 text-black hover:bg-darkpink hover:text-white dark:hover:bg-gray-600"
                      >
                        Current Plan
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Premium Package */}
                  <Card className="bg-darkpink rounded-3xl text-white border-none">
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-2">Premium</h3>
                      <div className="flex items-baseline mb-4">
                        <span className="text-4xl font-bold">45.00</span>
                        <span className="ml-2">/ Month</span>
                      </div>
                      <Separator className="my-4 bg-[#1E000C] opacity-20" />
                      <div className="space-y-3">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <Check className="text-black bg-green-500 rounded-full h-4 w-4 p-0.5" />
                            <span>3 Social Media Account</span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-6 bg-white text-darkpink hover:bg-gray-100 rounded-full">
                        Subscribe Now
                      </Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value="payment-methods"
            className="mt-0 focus-visible:outline-none focus-visible:ring-0"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Payment Methods</h2>
                <Button
                  variant="ghost"
                  className="text-darkpink hover:text-darkpink/80"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add New Method
                </Button>
              </div>

              <Card className="border-none bg-[#FFF5F8] dark:bg-[#27191f] rounded-3xl">
                <CardContent className="p-6 space-y-6">
                  {/* Existing Card Section */}
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-medium text-lg mb-2">
                            Mastercard
                          </h3>
                          <p className="text-sm text-gray-400 dark:text-white dark:text-opacity-50">
                            Card No: 1234 **** **** ****
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-full bg-transparent hover:bg-gray-100"
                    >
                      Remove
                    </Button>
                  </div>

                  <Separator className="bg-gray-200" />

                  {/* Accepted Methods Section */}
                  <div className="space-y-3">
                    <p className="text-sm text-black dark:text-white">
                      We accept the following payment methods:
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-white dark:text-opacity-50 space-y-1">
                      <li>• Credit Cards (Visa, Mastercard, etc.)</li>
                      <li>• Bank Transfers</li>
                      <li>• PayPal (if available)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value="payment-history"
            className="mt-0 focus-visible:outline-none focus-visible:ring-0"
          >
            <h2 className="text-xl font-semibold mb-4">Payment History</h2>
            <Card className="border-none dark:bg-[#100007]">
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#FFF5F8] dark:bg-[#27191f] rounded-2xl">
                      <TableHead className="text-black dark:text-white text-center">
                        Plan
                      </TableHead>
                      <TableHead className="text-black dark:text-white text-center">
                        Billing cycle
                      </TableHead>
                      <TableHead className="text-black dark:text-white text-center">
                        Created Date
                      </TableHead>
                      <TableHead className="text-black dark:text-white text-center">
                        End Date
                      </TableHead>
                      <TableHead className="text-black dark:text-white text-center">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistoryData.map((payment, index) => (
                      <TableRow key={index} className="h-12">
                        <TableCell className="text-black dark:text-white text-center">
                          {payment.plan}
                        </TableCell>
                        <TableCell className="text-black dark:text-white text-center">
                          {payment.billingCycle}
                        </TableCell>
                        <TableCell className="text-black dark:text-white text-center">
                          {payment.createdDate}
                        </TableCell>
                        <TableCell className="text-black dark:text-white text-center">
                          {payment.endDate}
                        </TableCell>
                        <TableCell className="text-black dark:text-white text-center">
                          <Badge
                            variant={
                              payment.status === 'UNPAID'
                                ? 'outline'
                                : 'default'
                            }
                            className={`
                              rounded-full px-4 
                              ${
                                payment.status === 'UNPAID'
                                  ? 'bg-red-50 text-red-500 hover:bg-red-50'
                                  : 'bg-green-50 text-green-500 hover:bg-green-50'
                              }
                            `}
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            isActive
                            className="bg-darkpink hover:bg-pink-200 text-white"
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-400">
                      Showing 1 to 10 of 4 entries
                    </p>
                    <Select defaultValue="10">
                      <SelectTrigger className="w-auto rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Show 5</SelectItem>
                        <SelectItem value="10">Show 10</SelectItem>
                        <SelectItem value="20">Show 20</SelectItem>
                        <SelectItem value="50">Show 50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SubscriptionForm;
