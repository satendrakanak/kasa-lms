"use client";

import React, { ReactNode, createContext, useContext } from "react";

type UserCountryContextValue = {
  userCountry: string;
  userCurrency: string;
  userRegion: string | null;
  userCity: string | null;
  userIpAddress: string | null;
  userCountryName: string | null;
  exchangeRate: number | null;
};

const UserCountryContext = createContext<UserCountryContextValue>({
  userCountry: "IN",
  userCurrency: "INR",
  userRegion: null,
  userCity: null,
  userIpAddress: null,
  userCountryName: null,
  exchangeRate: 1 as number | null,
});

export const useUserCountry = () => useContext(UserCountryContext);

export const UserCountryProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <UserCountryContext.Provider
      value={{
        userCountry: "IN",
        userCurrency: "INR",
        userRegion: "Maharashtra",
        userCity: "Mumbai",
        userIpAddress: "127.0.0.1",
        userCountryName: "India",
        exchangeRate: 1,
      }}
    >
      {children}
    </UserCountryContext.Provider>
  );
};
