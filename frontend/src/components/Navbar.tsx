import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useNotifications } from '@/hooks/useNotifications';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  Bell,
  GraduationCap,
  ShoppingCart,
  Trash2,
  Moon,
  Sun
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'student':
        return '/dashboard/student';
      case 'teacher':
        return '/dashboard/teacher';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/';
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
              EduVillage
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/courses"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Courses
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Theme Toggle - NEW SAFE ADDITION */}
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === 'light' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>

                {/* Notifications with real count - SAFE UPDATE */}
                <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/notifications')}>
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                {/* Cart Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      {getTotalItems() > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                          {getTotalItems()}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Shopping Cart</p>
                        <span className="text-xs text-muted-foreground">{getTotalItems()} items</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    {cartItems.length > 0 ? (
                      <>
                        <div className="max-h-64 overflow-y-auto">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-muted/50">
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  {(item as any).stream ? `Class ${item.classNumber} - ${(item as any).stream}` : `Class ${item.classNumber}`}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {item.subjects.join(', ')}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm font-semibold">${item.price}</span>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                      -
                                    </Button>
                                    <span className="text-xs w-6 text-center">{item.quantity}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      +
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <DropdownMenuSeparator />
                        <div className="p-3">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold">Total: ${getTotalPrice()}</span>
                          </div>
                          <Button className="w-full btn-primary-gradient" onClick={() => navigate('/checkout')}>
                            Proceed to Checkout
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="p-6 text-center">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Your cart is empty</p>
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                        <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground capitalize mt-1 w-fit">
                          {user?.role}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate(getDashboardPath())}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button onClick={() => navigate('/register')} className="btn-primary-gradient">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-slide-down">
            <Link
              to="/courses"
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/about"
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex items-center justify-between px-2">
                  <span className="text-sm font-medium">Cart</span>
                  <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="h-4 w-4" />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary text-[8px] font-medium text-primary-foreground flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                </div>
                {cartItems.length > 0 && (
                  <div className="space-y-2">
                    {cartItems.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center justify-between px-2 py-1 bg-muted/50 rounded">
                        <div className="flex-1">
                          <p className="text-xs font-medium">
                            {(item as any).stream ? `Class ${item.classNumber} - ${(item as any).stream}` : `Class ${item.classNumber}`}
                          </p>
                          <p className="text-xs text-muted-foreground">${item.price} × {item.quantity}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {cartItems.length > 3 && (
                      <p className="text-xs text-muted-foreground px-2">+{cartItems.length - 3} more items</p>
                    )}
                    <Button
                      className="w-full btn-primary-gradient"
                      size="sm"
                      onClick={() => {
                        navigate('/checkout');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Checkout (${getTotalPrice()})
                    </Button>
                  </div>
                )}
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate(getDashboardPath());
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Log out
                </Button>
              </div>
            ) : (
              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full btn-primary-gradient"
                  onClick={() => {
                    navigate('/register');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
