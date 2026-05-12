/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { CrownIcon, SkullIcon } from "./components/Icons";
import { BasquiatButton } from "./components/BasquiatButton";

type Category = "Travel (Scrap)" | "Portrait (Icon)" | "Abstract (Ghost)";

interface ImageData {
  id: string;
  url: string;
  title: string;
  description: string;
  category: Category;
  rotation: number;
  size: "small" | "medium" | "large";
}

const CATEGORIES: Category[] = ["Travel (Scrap)", "Portrait (Icon)", "Abstract (Ghost)"];

export default function App() {
  const [images, setImages] = useState<ImageData[]>([
    {
      id: "1",
      url: "https://picsum.photos/seed/bas1/800/1000",
      title: "GHOSTHEAD 01",
      description: "FOUND OBJECT IN BROOKLYN",
      category: "Abstract (Ghost)",
      rotation: -2,
      size: "large",
    },
    {
      id: "2",
      url: "https://picsum.photos/seed/bas2/800/600",
      title: "ICON STUDY",
      description: "STREET CORNER SHADOWS",
      category: "Portrait (Icon)",
      rotation: 3,
      size: "medium",
    },
    {
      id: "3",
      url: "https://picsum.photos/seed/bas3/600/800",
      title: "SCRAP REPEAT",
      description: "SUBWAY WALL MEMORY",
      category: "Travel (Scrap)",
      rotation: 1,
      size: "small",
    },
  ]);

  const [filter, setFilter] = useState<Category | "ALL">("ALL");
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Image Upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage: ImageData = {
          id: Date.now().toString(),
          url: reader.result as string,
          title: "GHOSTHEAD",
          description: "FOUND OBJECT",
          category: filter === "ALL" ? "Abstract (Ghost)" : filter,
          rotation: Math.random() * 6 - 3, // -3 to 3 degrees
          size: ["small", "medium", "large"][Math.floor(Math.random() * 3)] as any,
        };
        setImages((prev) => [newImage, ...prev]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Delete
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Handle Metadata Update
  const updateMetadata = (id: string, field: "title" | "description", value: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, [field]: value } : img))
    );
    if (selectedImage && selectedImage.id === id) {
      setSelectedImage({ ...selectedImage, [field]: value });
    }
  };

  const filteredImages = filter === "ALL" ? images : images.filter((img) => img.category === filter);

  return (
    <div className="min-h-screen px-4 py-8 md:px-12 relative">
      {/* Design Background Blobs */}
      <div className="bg-blobs">
        <div className="blob-red" />
        <div className="blob-blue" />
        <div className="blob-yellow" />
      </div>

      {/* Header */}
      <header className="relative z-10 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8 border-b-4 border-black bg-white/40 backdrop-blur-sm p-6 -mx-4 md:-mx-12">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 flex items-center justify-center bg-[#FFD700] border-4 border-black transform -rotate-3 shrink-0">
            <CrownIcon className="w-10 h-10 text-black" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-gallery uppercase tracking-tighter italic font-black leading-none py-1">
              SAMO© GALLERY
            </h1>
            <p className="font-hand text-xs font-bold uppercase tracking-widest opacity-60 mt-1">
              SESSION_ACTIVE: {filteredImages.length > 0 ? "TRUE" : "FALSE"} // NY_1983
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <nav className="flex gap-4">
            <FilterTab active={filter === "ALL"} onClick={() => setFilter("ALL")} label="SCRAP" rotate={1} />
            <FilterTab active={filter === "Portrait (Icon)"} onClick={() => setFilter("Portrait (Icon)")} label="ICON" rotate={-2} />
            <FilterTab active={filter === "Abstract (Ghost)"} onClick={() => setFilter("Abstract (Ghost)")} label="GHOST" rotate={3} />
          </nav>
          
          <BasquiatButton 
            onClick={() => fileInputRef.current?.click()}
            className="md:ml-4"
          >
            + ADD FIRE
          </BasquiatButton>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleUpload} 
          className="hidden" 
          accept="image/*" 
        />
      </header>

      {/* Grid Container */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8 relative z-10 pb-24">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, idx) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="basquiat-card relative break-inside-avoid group"
              style={{ 
                rotate: `${image.rotation}deg`,
              }}
            >
              <div 
                className={`
                  relative bg-white p-2 border-4 border-black cursor-pointer transition-transform
                  ${idx % 3 === 0 ? "shadow-[8px_8px_0px_0px_#2B59C3]" : idx % 3 === 1 ? "shadow-[8px_8px_0px_0px_#FF3B30]" : "shadow-[8px_8px_0px_0px_#FFD700]"}
                `}
                onClick={() => setSelectedImage(image)}
              >
                {/* Index badge */}
                <div className="absolute -top-4 -left-4 bg-[#FFD700] border-2 border-black px-2 font-black text-xs z-10 py-0.5">
                  {(idx + 1).toString().padStart(3, '0')}
                </div>

                <div className="bg-gray-100 border-2 border-black overflow-hidden relative">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-auto grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="mt-2 flex justify-between items-end">
                  <div className="overflow-hidden">
                    <h3 className="font-marker text-xs uppercase leading-tight truncate">{image.title}</h3>
                    <p className="font-memo text-[10px] opacity-60 uppercase">{image.category.split(' ')[0]} // {image.id.slice(-4)}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    onClick={(e) => handleDelete(image.id, e)}
                    className="w-7 h-7 bg-[#FF3B30] text-white font-black border-2 border-black flex items-center justify-center shrink-0 hover:bg-black transition-colors"
                  >
                    X
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-[#E5E1D8]/95 backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            />
            
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative max-w-6xl w-full bg-white shadow-[20px_20px_0px_#1A1A1A] p-6 md:p-12 border-4 border-black flex flex-col md:flex-row gap-10 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white p-2 bg-[#FF3B30] border-4 border-black hover:rotate-90 transition-transform z-20"
              >
                <X className="w-8 h-8 stroke-[3px]" />
              </button>

              <div className="flex-1 min-w-0 flex items-center justify-center bg-stone-100 border-4 border-black relative">
                <div className="absolute inset-4 border-2 border-black border-dashed opacity-20 pointer-events-none" />
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[60vh] object-contain shadow-2xl relative z-10"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-96 flex flex-col gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 bg-black text-white text-[10px] font-black italic">ACTIVE_METADATA</span>
                    <div className="flex-1 h-0.5 bg-black"></div>
                  </div>
                  <label className="font-hand text-[10px] font-black uppercase opacity-40 block mb-1">CROWN_TITLE</label>
                  <input
                    type="text"
                    value={selectedImage.title}
                    onChange={(e) => updateMetadata(selectedImage.id, "title", e.target.value)}
                    className="w-full font-gallery text-4xl italic font-black uppercase bg-transparent border-b-4 border-black focus:border-[#FFD700] outline-none py-2"
                  />
                </div>

                <div>
                  <label className="font-hand text-[10px] font-black uppercase opacity-40 block mb-1">SCRAP_DESCRIPTION</label>
                  <textarea
                    value={selectedImage.description}
                    onChange={(e) => updateMetadata(selectedImage.id, "description", e.target.value)}
                    rows={4}
                    className="w-full font-bold text-sm italic bg-[#E5E1D8]/30 p-4 border-4 border-black focus:ring-0 outline-none resize-none"
                  />
                </div>

                <div className="mt-auto pt-8 border-t-4 border-black">
                  <div className="flex items-center gap-4 mb-6">
                    <SkullIcon className="w-12 h-12 text-black shrink-0" />
                    <div className="font-hand text-xs font-black uppercase leading-tight italic">
                      "MOST KINGS GET THEIR HEADS CUT OFF" // JM-B
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <BasquiatButton 
                      variant="danger" 
                      className="flex-1 py-4"
                      onClick={(e) => {
                        handleDelete(selectedImage.id, e);
                        setSelectedImage(null);
                      }}
                    >
                      DESTROY
                    </BasquiatButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 p-4 border-t-4 border-black bg-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest overflow-x-auto w-full md:w-auto">
          <span className="shrink-0">OBJECT_COUNT: {images.length.toString().padStart(3, '0')}</span>
          <span className="shrink-0 text-[#2B59C3]">BLUE: ACTIVE</span>
          <span className="shrink-0 text-[#FF3B30]">RED: DANGER</span>
          <span className="shrink-0 text-[#FFD700]">YELLOW: CROWN</span>
        </div>
        <div className="font-gallery font-black italic text-sm md:text-base border-l-4 border-black pl-4">
          ART IS WHAT YOU CAN GET AWAY WITH // SAMO©
        </div>
      </footer>
    </div>
  );
}

function FilterTab({ active, onClick, label, rotate }: { active: boolean; onClick: () => void; label: string; rotate: number }) {
  return (
    <button 
      onClick={onClick}
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`
        px-4 py-1 border-2 border-black text-lg font-black uppercase tracking-tighter transition-all
        ${active ? "bg-black text-white" : "bg-transparent hover:bg-black hover:text-white"}
      `}
    >
      {label}
    </button>
  );
}

