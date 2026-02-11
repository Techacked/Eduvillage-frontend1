import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  BookOpen,
  ChevronRight,
  ShoppingCart,
  CreditCard
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface ClassCourseCardProps {
  id?: string;
  classNumber: number;
  subjects: string[];
  stream?: string;
  totalLessons: number;
  color: string;
  price: number;
}

const ClassCourseCard: React.FC<ClassCourseCardProps> = ({
  id,
  classNumber,
  subjects,
  stream,
  totalLessons,
  color,
  price,
}) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const finalId = id || `${classNumber}-${stream || 'default'}`;

  const getClassLabel = () => {
    return stream ? `Class ${classNumber} - ${stream}` : `Class ${classNumber}`;
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: finalId,
      title: getClassLabel(),
      classNumber,
      subjects,
      stream,
      totalLessons,
      color,
      price,
    };

    addToCart(cartItem);
    toast.success(`${getClassLabel()} added to cart!`);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.info('Please sign in to purchase courses');
      return;
    }

    handleAddToCart();
    toast.info('Redirecting to checkout...');
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/30 overflow-hidden">
      <div className={`h-2 ${color}`} />

      <CardContent className="p-5">
        <Link to={`/courses/${finalId}`}>
          <div className="cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl ${color} bg-opacity-10 flex items-center justify-center`}
              >
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>

              <Badge variant="outline" className="text-xs">
                {totalLessons} Lessons
              </Badge>
            </div>

            <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
              {getClassLabel()}
            </h3>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {subjects.map((subject, index) => (
                <Badge key={index} variant="secondary" className="text-xs font-normal">
                  {subject}
                </Badge>
              ))}
            </div>

            <div className="mb-4">
              <span className="text-2xl font-bold text-primary">${price}</span>
            </div>
          </div>
        </Link>

        <div className="flex gap-2 mb-4">
          <Button
            onClick={handleBuyNow}
            className="flex-1 btn-primary-gradient"
            size="sm"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Buy Now
          </Button>

          <Button
            onClick={handleAddToCart}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{subjects.length} Subjects</span>
          </div>

          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCourseCard;
