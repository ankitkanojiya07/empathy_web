import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Shield,
  ChatRound,
  VideoFrame,
  Phone,
  User,
  Star,
  ArrowRight,
  CheckCircle,
  Lock,
  Bolt,
  MenuDots,
  CloseCircle,
  Target,
} from "@solar-icons/react";

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setMobileMenuOpen(false);
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black scroll-smooth">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-lg shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="flex items-center space-x-3 group">
              <img
                src="/logo.png"
                alt="Empathy Logo"
                className="w-10 h-10 object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Empathy
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#features"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
              >
                How it Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="#listeners"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
              >
                Our Listeners
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <Button
                variant="outline"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold transition-all duration-200 hover:scale-105"
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSewEVIWRNXLqVVaFp9GigHvoZiRNlR8-0QBjch75IpgD_cOUQ/viewform?usp=publish-editor",
                    "_blank"
                  )
                }
              >
                Become a Listener
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl">
                Download App
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <CloseCircle size={24} weight="Outline" />
              ) : (
                <MenuDots size={24} weight="Outline" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white border-t transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            <a
              href="#features"
              className="block text-gray-700 font-medium hover:text-purple-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block text-gray-700 font-medium hover:text-purple-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it Works
            </a>
            <a
              href="#listeners"
              className="block text-gray-700 font-medium hover:text-purple-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Listeners
            </a>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSewEVIWRNXLqVVaFp9GigHvoZiRNlR8-0QBjch75IpgD_cOUQ/viewform?usp=publish-editor",
                  "_blank"
                )
              }
            >
              Become a Listener
            </Button>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white mt-2">
              Download App
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-purple-50/30"></div>

        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left animate-fade-in">
              {/* Main Title */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  You're Not
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
                    Alone
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                  India's first emotional support platform designed specifically
                  for seniors. Connect, share, and find peace through meaningful
                  conversations.
                </p>
              </div>

              {/* Trust Pills */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {["Anonymous", "Secure", "Empathetic"].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-6 text-lg shadow-2xl hover:opacity-90 transform hover:scale-105 transition-all duration-200 hover:shadow-purple-500/50">
                  Download App
                  <ArrowRight size={20} weight="Outline" className="ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-gray-900 text-gray-900 font-semibold px-8 py-6 text-lg hover:bg-gray-900 hover:text-white transition-all duration-200 hover:scale-105"
                >
                  Learn More
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                {[
                  { icon: Shield, text: "100% Secure" },
                  { icon: Lock, text: "AI Moderated" },
                  { icon: CheckCircle, text: "Verified" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center space-x-2 group"
                  >
                    <item.icon
                      size={20}
                      weight="Outline"
                      className="text-green-600 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative max-w-md w-full group">
                {/* Main Image Container */}
                <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-[1.02]">
                  <img
                    src="/12.jpg"
                    alt="Empathy Support"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Floating Cards */}
                <div className="absolute -bottom-6 -left-6 bg-white p-2.5 rounded-xl shadow-xl border border-gray-100 transform rotate-[-5deg] hover:rotate-[-3deg] transition-transform duration-200 hover:shadow-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md">
                      <CheckCircle
                        size={16}
                        weight="Bold"
                        className="text-white"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-xs">24/7 Support</p>
                      <p className="text-[10px] text-gray-600">
                        Always Available
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white p-2.5 rounded-xl shadow-xl border border-gray-100 transform rotate-[5deg] hover:rotate-[3deg] transition-transform duration-200 hover:shadow-2xl">
                  <div className="flex items-center space-x-2">
                    <Star size={16} weight="Bold" className="text-yellow-500" />
                    <div>
                      <p className="font-semibold text-xs">Trusted Platform</p>
                      <p className="text-[10px] text-gray-600">50K+ Users</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Empathy
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the power of human connection in a safe, anonymous
              environment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "100% Anonymous",
                description:
                  "Your identity stays private. Share freely without fear of judgment or exposure.",
                color: "from-purple-600 to-pink-600",
              },
              {
                icon: Bolt,
                title: "Instant Connection",
                description:
                  "Connect with a verified Listener in seconds. No appointments, no waiting lists.",
                color: "from-blue-600 to-cyan-600",
              },
              {
                icon: User,
                title: "Verified Listeners",
                description:
                  "All Listeners are carefully vetted and trained to provide empathetic support.",
                color: "from-pink-600 to-rose-600",
              },
              {
                icon: ChatRound,
                title: "Multiple Formats",
                description:
                  "Chat, voice call, or video call - choose what feels most comfortable for you.",
                color: "from-indigo-600 to-purple-600",
              },
              {
                icon: Heart,
                title: "Shared Experiences",
                description:
                  "Connect with people who've navigated similar life challenges and experiences.",
                color: "from-rose-600 to-pink-600",
              },
              {
                icon: Lock,
                title: "AI-Powered Safety",
                description:
                  "Advanced AI moderation ensures all conversations remain respectful and secure.",
                color: "from-purple-600 to-indigo-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 bg-white cursor-pointer transform hover:-translate-y-1"
              >
                <CardContent className="p-5">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}
                  >
                    <feature.icon
                      size={24}
                      weight="Bold"
                      className="text-white"
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Getting support is simple and fast
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {[
              {
                step: "1",
                title: "Download App",
                desc: "Get the app from App Store or Google Play",
                icon: "📱",
              },
              {
                step: "2",
                title: "Create Profile",
                desc: "Sign up anonymously in seconds",
                icon: "👤",
              },
              {
                step: "3",
                title: "Find Listener",
                desc: "Browse and connect with verified Listeners",
                icon: "🔍",
              },
              {
                step: "4",
                title: "Start Talking",
                desc: "Chat, call or video call instantly",
                icon: "💬",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <Card className="border-2 border-gray-200 hover:border-purple-600 hover:shadow-lg transition-all duration-300 bg-white h-full transform hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-md">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>

                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-[-2rem] transform -translate-y-1/2 z-10">
                    <ArrowRight
                      size={32}
                      weight="Outline"
                      className="text-purple-600 animate-pulse"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-6 text-lg shadow-xl hover:opacity-90 hover:scale-105 transition-all duration-200 hover:shadow-purple-500/50">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Listeners Section */}
      <section id="listeners" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our Listeners
            </h2>
            <p className="text-xl text-gray-600">
              Verified, empathetic, and ready to listen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya",
                initial: "P",
                status: "Online",
                experience: "Relationship Support",
                rating: 4.9,
                reviews: 234,
                story:
                  "Helped 500+ people navigate breakups and relationship challenges",
                gradient: "from-pink-500 to-rose-500",
              },
              {
                name: "Rahul",
                initial: "R",
                status: "Online",
                experience: "Career & Life Guidance",
                rating: 4.8,
                reviews: 189,
                story:
                  "Former corporate professional helping others find their path",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                name: "Ananya",
                initial: "A",
                status: "Online",
                experience: "Mental Wellness",
                rating: 5.0,
                reviews: 312,
                story:
                  "Specializes in anxiety, loneliness, and emotional healing",
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((listener, index) => (
              <Card
                key={index}
                className="overflow-hidden border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 bg-white group transform hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  {/* Profile Header */}
                  <div
                    className={`relative h-32 bg-gradient-to-br ${listener.gradient} p-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
                  >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {listener.initial}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-semibold rounded-full flex items-center space-x-1 shadow-md">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        <span>{listener.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Profile Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {listener.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {listener.experience}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            weight="Bold"
                            className="text-yellow-500"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-700 font-medium">
                        {listener.rating} ({listener.reviews} reviews)
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {listener.story}
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 transition-all duration-200"
                      >
                        <ChatRound size={14} weight="Outline" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 transition-all duration-200"
                      >
                        <Phone size={14} weight="Outline" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 transition-all duration-200"
                      >
                        <VideoFrame size={14} weight="Outline" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-6 text-lg shadow-xl hover:opacity-90 hover:scale-105 transition-all duration-200 hover:shadow-purple-500/50">
              View All Listeners
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What People Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real people
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "I was going through a really tough breakup and didn't know who to talk to. The listener I connected with was so understanding and helped me see things from a different perspective. This platform literally saved me.",
                date: "2 days ago",
              },
              {
                text: "Being anonymous made it so much easier to open up. I could share things I couldn't tell my friends. The AI moderation keeps everything safe and respectful.",
                date: "1 week ago",
              },
              {
                text: "I've tried therapy before but this feels different. Talking to someone who's been through similar experiences is so validating. Highly recommend!",
                date: "3 days ago",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 bg-white transform hover:-translate-y-1"
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        weight="Bold"
                        className="text-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      A
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Anonymous User
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.date}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                To provide a safe, accessible, and non-judgmental space for
                individuals to feel heard and understood by connecting them with
                people who have navigated similar life experiences.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                We are not a replacement for therapy; we are a platform for
                human connection, empathy, and support when you need it most.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  desc: "Making emotional support accessible to everyone",
                },
                {
                  icon: Heart,
                  title: "Our Values",
                  desc: "Empathy, safety, and human connection",
                },
                {
                  icon: Star,
                  title: "Our Commitment",
                  desc: "Verified listeners and AI-powered safety",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon size={24} weight="Bold" className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      {/* <section className="py-24 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Feel Heard?</h2>
          <p className="text-xl mb-12 opacity-90">
            Join thousands of people finding support and connection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-600 font-semibold px-8 py-6 text-lg hover:bg-gray-100 shadow-2xl">
              Download App
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" className="border-2 border-white text-white font-semibold px-8 py-6 text-lg hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/logo.png"
                  alt="Empathy Logo"
                  className="w-10 h-10 object-contain"
                />
                <span className="text-2xl font-bold">Empathy</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                India's biggest emotional support platform connecting people
                through empathy and understanding.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-purple-400 transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    Download
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSewEVIWRNXLqVVaFp9GigHvoZiRNlR8-0QBjch75IpgD_cOUQ/viewform?usp=publish-editor"
                    className="hover:text-purple-400 transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    Become a Listener
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSewEVIWRNXLqVVaFp9GigHvoZiRNlR8-0QBjch75IpgD_cOUQ/viewform?usp=publish-editor"
                    className="hover:text-purple-400 transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Empathy (We Heal Private Limited). All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
