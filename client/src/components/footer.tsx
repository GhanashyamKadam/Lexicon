import { Link } from "wouter";
import { GraduationCap, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-bold">Lexicon Learners</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering students with exceptional English language skills through innovative teaching methods and personalized attention.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/courses" className="text-gray-400 hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Courses</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400">ICSE English</span></li>
              <li><span className="text-gray-400">ISC English</span></li>
              <li><span className="text-gray-400">Literature</span></li>
              <li><span className="text-gray-400">Public Speaking</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <p className="text-gray-400">123 Education Street<br />Academic District, City - 560001</p>
              <p className="text-gray-400">+91 98765 43210</p>
              <p className="text-gray-400">info@lexiconlearners.com</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Lexicon Learners. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
