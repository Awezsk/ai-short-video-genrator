"use client"
import React from 'react'
import { Github, Linkedin, Twitter, Mail, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Team() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Full Stack Developer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      bio: "Passionate about creating seamless user experiences and scalable backend solutions.",
      gradient: "from-purple-600 via-pink-600 to-red-600",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "john@example.com"
      }
    },
    {
      name: "Jane Smith",
      role: "UI/UX Designer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      bio: "Crafting beautiful and intuitive designs that users love to interact with.",
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "jane@example.com"
      }
    },
    {
      name: "Mike Johnson",
      role: "AI/ML Engineer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      bio: "Building intelligent systems that power the next generation of applications.",
      gradient: "from-orange-600 via-red-600 to-pink-600",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mike@example.com"
      }
    },
    {
      name: "Sarah Williams",
      role: "Product Manager",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "Bridging the gap between user needs and technical implementation.",
      gradient: "from-emerald-600 via-green-600 to-lime-600",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "sarah@example.com",
        website: "https://sarahwilliams.com"
      }
    }
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto py-16 px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-4 animate-gradient">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The talented individuals who brought this project to life with their dedication, 
            creativity, and expertise.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 overflow-hidden border border-gray-800 hover:border-purple-500/50 hover:scale-105"
            >
              {/* Profile Image with Dynamic Gradient */}
              <div className={`h-64 bg-gradient-to-br ${member.gradient} relative flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-10 transition-opacity duration-500"></div>
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="relative z-10 w-48 h-48 rounded-full border-4 border-white shadow-2xl group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Member Info */}
              <div className="p-6 bg-gradient-to-b from-gray-900 to-black">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                  {member.name}
                </h3>
                <p className="text-purple-400 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-3 justify-center pt-4 border-t border-gray-800">
                  {member.social.github && (
                    <Link 
                      href={member.social.github}
                      target="_blank"
                      className="p-2 hover:bg-purple-600/20 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <Github size={20} className="text-gray-400 hover:text-purple-400 transition-colors" />
                    </Link>
                  )}
                  {member.social.linkedin && (
                    <Link 
                      href={member.social.linkedin}
                      target="_blank"
                      className="p-2 hover:bg-blue-600/20 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <Linkedin size={20} className="text-gray-400 hover:text-blue-400 transition-colors" />
                    </Link>
                  )}
                  {member.social.twitter && (
                    <Link 
                      href={member.social.twitter}
                      target="_blank"
                      className="p-2 hover:bg-sky-600/20 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <Twitter size={20} className="text-gray-400 hover:text-sky-400 transition-colors" />
                    </Link>
                  )}
                  {member.social.email && (
                    <Link 
                      href={`mailto:${member.social.email}`}
                      className="p-2 hover:bg-red-600/20 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <Mail size={20} className="text-gray-400 hover:text-red-400 transition-colors" />
                    </Link>
                  )}
                  {member.social.website && (
                    <Link 
                      href={member.social.website}
                      target="_blank"
                      className="p-2 hover:bg-green-600/20 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <Globe size={20} className="text-gray-400 hover:text-green-400 transition-colors" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Information Section */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-800 backdrop-blur-sm">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 text-center">
            About This Project
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-gray-300">
            <p className="text-lg">
              This AI-powered video creation platform was built with cutting-edge technologies 
              including Next.js, React, and advanced AI models to help users create professional 
              videos effortlessly.
            </p>
            <p className="text-lg">
              Our team collaborated seamlessly across design, development, and product management 
              to deliver a solution that combines powerful features with an intuitive user experience.
            </p>
            
            {/* Technologies Used */}
            <div className="pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Technologies We Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Next.js', 'React', 'Tailwind CSS', 'Remotion', 'Convex', 'Google Cloud', 'OpenAI', 'Assembly AI'].map((tech, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 rounded-full font-medium text-sm hover:from-purple-600/40 hover:to-pink-600/40 transition-all duration-300 hover:scale-105 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">
            Want to Get in Touch?
          </h3>
          <p className="text-gray-400 mb-6">
            We'd love to hear from you! Reach out to discuss collaborations or just say hello.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300"
            >
              <Mail className="mr-2" size={20} />
              Contact Us
            </Button>
            <Link href="/dashboard">
              <Button 
                size="lg"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-purple-500 transition-all duration-300"
              >
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Add custom animations in your global CSS */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default Team