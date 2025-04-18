import { UserService } from "@/services/UserService";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: any;
  loading: boolean;
  updateUser: (newUser: any) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  updateUser: () => { },
  signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

const COUNTDOWN_SECONDS = 5; // Timeout duration

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchUser = async () => {
      try {
        const user = await UserService.getUserSession()
        if (user) {
          setUser(user || null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (loading) {
      fetchUser();

      // Start the countdown timer
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            // Stop loading when timer reaches 0
            setLoading(false);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [loading]);

  // Sign out function
  const signOut = async () => {
    try {
      await UserService.signOutUser()
      setUser(null); // Set the user state to null
      window.location.href = "/"; // Reload the window
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const updateUser = (newUser: any) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
