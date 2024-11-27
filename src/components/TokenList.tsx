import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

export const TokenList = () => {
  const { toast } = useToast();

  const { data: tokens } = useQuery({
    queryKey: ['tokens'],
    queryFn: async () => {
      const response = await fetch('/api/admin/tokens');
      if (!response.ok) throw new Error('Failed to fetch tokens');
      return response.json();
    }
  });

  const invalidateToken = async (token: string) => {
    try {
      const response = await fetch('/api/admin/tokens/invalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) throw new Error('Failed to invalidate token');

      toast({
        title: "Token invalidé",
        description: "Le token a été invalidé avec succès",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'invalider le token",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tokens?.map((token: { token: string; isValid: boolean }) => (
        <Card key={token.token} className="bg-white">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Token: {token.token}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-sm ${token.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {token.isValid ? 'Valide' : 'Invalide'}
              </span>
              {token.isValid && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => invalidateToken(token.token)}
                >
                  Invalider
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};