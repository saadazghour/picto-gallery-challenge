"use client";

import React, { useEffect, useState } from "react";
import { getPhotos } from "../services/unsplash";
import { UnsplashPhoto } from "../../types";
import PhotoCard from "../components/PhotoCard";
import "./globals.css";

export default function Home() {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  // It meant that we're initializing a state that is an object. This object will have strings as keys (which can be photo IDs) and boolean values indicating whether the photo is liked or not.
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    setLikedPhotos((prevLikes: any) => ({
      ...prevLikes,
      [id]: !prevLikes[id] || false,
    }));
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const fetchedPhotos = await getPhotos();
        setPhotos(fetchedPhotos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="bg-gray-100  min-h-screen p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {photos?.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isLiked={likedPhotos[photo.id]}
              onLike={handleLike}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
