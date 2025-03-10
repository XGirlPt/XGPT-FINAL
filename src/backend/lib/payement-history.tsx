export type PaymentRecord = {
    plan: string;
    billingCycle: number;
    createdDate: string;
    endDate: string;
    status: 'UNPAID' | 'PAID OFF';
  };
  
  export const paymentHistoryData: PaymentRecord[] = [
    {
      plan: 'Perform Plan',
      billingCycle: 3,
      createdDate: '20 Jan 2023',
      endDate: '20 Apr 2023',
      status: 'UNPAID',
    },
    {
      plan: 'Perform Plan',
      billingCycle: 2,
      createdDate: '20 Jan 2023',
      endDate: '20 Apr 2023',
      status: 'PAID OFF',
    },
    {
      plan: 'Perform Plan',
      billingCycle: 2,
      createdDate: '20 Jan 2023',
      endDate: '20 Apr 2023',
      status: 'PAID OFF',
    },
    {
      plan: 'Perform Plan',
      billingCycle: 2,
      createdDate: '20 Jan 2023',
      endDate: '20 Apr 2023',
      status: 'PAID OFF',
    },
    {
      plan: 'Perform Plan',
      billingCycle: 2,
      createdDate: '20 Jan 2023',
      endDate: '20 Apr 2023',
      status: 'PAID OFF',
    },
    {
      plan: 'Perform Plan',
      billingCycle: 2,
      createdDate: '20 Jan 2023',
      endDate: '20 Apr 2023',
      status: 'PAID OFF',
    },
    {
      plan: 'Perform Plan',
      billingCycle: 2,
      createdDate: '20 Jan 2023',
      endDate: '20 Apr 2023',
      status: 'PAID OFF',
    },
    {
      plan: 'Perform Plan',
      billingCycle: 2,
      createdDate: '20 Jan 2023',
      endDate: '20 Apr 2023',
      status: 'PAID OFF',
    },
    {
      plan: 'Perform Plan',
      billingCycle: 2,
      createdDate: '20 Jan 2023',
      endDate: '20 Apr 2023',
      status: 'PAID OFF',
    },
    {
      plan: 'Perform Plan',
      billingCycle: 2,
      createdDate: '20 Jan 2023',
      endDate: '20 Apr 2023',
      status: 'PAID OFF',
    },
    {
      plan: 'Perform Plan',
      billingCycle: 2,
      createdDate: '20 Jan 2023',
      endDate: '20 Apr 2023',
      status: 'PAID OFF',
    },
  ];
  