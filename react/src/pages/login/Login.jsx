import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { UserRoundPlus } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login attempted');
  };

  const handleRegistration = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-20 h-20 mb-2 flex items-center justify-center bg-primary/10 rounded-full">
            <UserRoundPlus className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Login to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsContent value="login">
              <form className="space-y-4 mt-5" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="identifier">Email or ID Number</Label>
                  <Input
                    id="identifier"
                    placeholder="Enter your email or ID number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button
                      variant="link"
                      className="px-0 font-normal text-sm"
                      onClick={handleRegistration}
                      type="button"
                    >
                      Register
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full text-black">
                  Login
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
