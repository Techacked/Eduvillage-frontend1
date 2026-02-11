import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Lock, ShoppingCart } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const Payment = () => {
  const { user, isAuthenticated } = useAuth();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const token = localStorage.getItem('token');
      
      // Process enrollment for single course or cart items
      if (courseId) {
        // Single course enrollment
        const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/enrollments/enroll`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courseId }),
        });

        if (!response.ok) throw new Error('Enrollment failed');
      } else {
        // Multiple courses from cart
        for (const item of cartItems) {
          await fetch(`${import.meta.env.VITE_API_BASE}/api/enrollments/enroll`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ courseId: item.id }),
          });
        }
        clearCart();
      }

      toast({
        title: 'Payment Successful!',
        description: 'You have been enrolled in the course(s)',
      });

      // Redirect to enrolled courses
      setTimeout(() => {
        navigate('/enrolled-courses');
      }, 1500);
    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const totalAmount = courseId ? 0 : getTotalPrice(); // If single course, fetch price separately

  return (
    <DashboardLayout>
      <div className="container max-w-4xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment Form */}
          <Card className="dark:bg-[#1E293B] dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Enter your payment information securely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName" className="dark:text-gray-200">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="dark:bg-[#0F172A] dark:text-white dark:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="dark:text-gray-200">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                    className="dark:bg-[#0F172A] dark:text-white dark:border-gray-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="dark:text-gray-200">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                      className="dark:bg-[#0F172A] dark:text-white dark:border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="dark:text-gray-200">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      type="password"
                      value={paymentData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={3}
                      required
                      className="dark:bg-[#0F172A] dark:text-white dark:border-gray-700"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-primary-gradient"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Pay $${totalAmount}`}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground dark:text-gray-400">
                  <Lock className="h-3 w-3" />
                  <span>Secure payment powered by Stripe</span>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="dark:bg-[#1E293B] dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <ShoppingCart className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {courseId ? (
                <div className="p-4 bg-muted rounded-lg dark:bg-[#0F172A]">
                  <p className="text-sm text-muted-foreground dark:text-gray-400">Course ID: {courseId}</p>
                  <p className="font-semibold mt-2 dark:text-white">Single Course Purchase</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between p-3 bg-muted rounded-lg dark:bg-[#0F172A]"
                    >
                      <div>
                        <p className="font-medium dark:text-white">{item.title}</p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold dark:text-white">
                        ${item.price * (item.quantity || 1)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t pt-4 dark:border-gray-700">
                <div className="flex justify-between text-lg font-bold dark:text-white">
                  <span>Total</span>
                  <span>${totalAmount}</span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  ✓ Lifetime access to course materials
                </p>
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  ✓ Certificate of completion
                </p>
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  ✓ 30-day money-back guarantee
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payment;
