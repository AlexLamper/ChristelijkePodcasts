"use client";

import React, { useEffect, useState } from "react";

// Define the structure of a verse
interface Verse {
  text: string;
  book: string;
  chapter: number;
  verse: number;
}

export default function VerseOfTheDay() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerseOfTheDay = async () => {
      setLoading(true);
      setError(null);

      try {
        // Access the API key from environment variables
        const rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;

        if (!rapidApiKey) {
          throw new Error("API Key is missing!");
        }

        const today = new Date();
        const dayOfYear = today.getDate();

        const book = "Proverbs";
        const chapter = 1;
        const verseNum = (dayOfYear % 31) + 1;

        // Fetch the verse from the API
        const response = await fetch(
          `https://ajith-holy-bible.p.rapidapi.com/GetVerseOfaChapter?Book=${book}&chapter=${chapter}&Verse=${verseNum}`, 
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": rapidApiKey,
              "X-RapidAPI-Host": "ajith-holy-bible.p.rapidapi.com",
            },
          }
        );

        // Log the response status and body for debugging
        console.log("Response Status:", response.status);
        const data = await response.json();
        console.log("API Response Data:", data);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (data && data.Output) {
          setVerse({
            text: data.Output,
            book: data.Book,
            chapter: parseInt(data.Chapter),
            verse: parseInt(data.Verse),
          });
        } else {
          throw new Error("Verse data not found in response.");
        }
      } catch (error) {
        setError(`Error fetching verse: ${error instanceof Error ? error.message : "Unknown error"}`);
        console.error("Error fetching verse:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerseOfTheDay();
  }, []);

  // Loading state
  if (loading) return <div>Loading verse of the day...</div>;

  // Error state
  if (error) return <div>Error: {error}</div>;

  // Render the verse of the day
  return (
    <div>
      {verse ? (
        <div className="p-2 text-white mb-6">
          <p className="text-md"><strong>{verse.book} {verse.chapter}:{verse.verse}</strong></p>
          <p className="text-sm mt-1">{verse.text}</p>
        </div>
      ) : (
        <div className="p-2 text-white mb-6">
            <p className="text-sm">No verse available.</p>
        </div>
      )}
    </div>
  );
}