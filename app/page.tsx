"use client";

import { UserService } from "@/services/UserService";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import Link from "next/link";
import ImagePopup from "@/components/Modal";
import { useAuth } from "@/context/AuthContext";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user, loading, updateUser } = useAuth();

  const handleButtonClick = () => {
    setIsPopupOpen(true); // Open the modal
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the modal
  };

  useEffect(() => {
    const fetchUser = async () => {
      // Get the user session
      const currentUser = await UserService.getUserSession();

      if (currentUser && currentUser.id) {
        const userExistsInDb = await UserService.checkUserExists(currentUser.id);
        //If user does not exist in the users table, insert user data
        if (!userExistsInDb) {
          const user: User = {
            id: currentUser.id,
            email: currentUser.email,
            name: currentUser.name,
            avatarUrl: currentUser.avatarUrl
          }
          await UserService.createUser(user)
        }
      }
      if (currentUser) updateUser(currentUser); // Set the user data to display their profile
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-3xl font-bold text-center mb-4">
          Plan Your Dream Trip
        </h1>
        <p className="text-center text-lg mb-6">
          Get started by exploring destinations and planning your next
          adventure.
        </p>

        <div className="flex gap-4">
          <Link href="/plan-itinerary">
            <button className="btn btn-primary py-2 px-6 text-white">
              Plan a Trip
            </button>
          </Link>
          <button
            className="btn btn-neutral py-2 px-6 text-white"
            onClick={handleButtonClick}
          >
            Buy us Coffee
          </button>
          {isPopupOpen && (
            <ImagePopup
              imageUrl="/images/paynow.jpg" // Image URL to show
              onClose={handleClosePopup} // Close button functionality
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Plan Your Trip Section (Always visible) */}
      <main className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-6xl font-bold text-center mb-4 ring-4 ring-white">
          Plan Your Dream Trip
        </h1>
        <p className="text-center text-2xl mb-6 ring-4 ring-white">
          Get started by exploring destinations and planning your next
          adventure.
        </p>

        <div className="flex gap-4">
          <Link href="/plan-itinerary">
            <button className="btn btn-primary py-2 px-6 text-white">
              Plan a Trip
            </button>
          </Link>
          <button
            className="btn btn-neutral py-2 px-6 text-white"
            onClick={handleButtonClick}
          >
            Buy us Coffee
          </button>
          {isPopupOpen && (
            <ImagePopup
              imageUrl="/images/paynow.jpg" // Image URL to show
              onClose={handleClosePopup} // Close button functionality
            />
          )}
        </div>
        {/* <HomeCarousel></HomeCarousel> */}
        <div className="w-full flex items-center justify-center mt-4">
          <ImageCarousel />
        </div>
      </main>
    </div>
  );
}
