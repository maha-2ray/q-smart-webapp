import React from "react";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-black">Q-SMART</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Features
              </a>
              <a
                href="#solutions"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Solutions
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Pricing
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Sign In
              </Link>
              <button className="bg-blue-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <p className="text-sm text-gray-600 font-medium">
                ✓ Trusted by clinics, banks, and public service teams
              </p>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-blue-900 mb-6 leading-tight">
              Remote queueing that feels calm, clear, and effortless.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Q-SMART helps service businesses replace physical lines with
              elegant web-based check-in, live wait estimates, and precise
              customer notifications.
            </p>
            <div className="flex gap-4">
              <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800">
                Book a Demo
              </button>
              <button className="border border-blue-900 text-blue-900 px-8 py-3 rounded-lg font-medium hover:bg-blue-900 hover:text-white transition">
                View Platform
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16">
              <div>
                <p className="text-3xl font-bold text-black">30%</p>
                <p className="text-sm text-gray-600">Spent on show risk</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-black">12m</p>
                <p className="text-sm text-gray-600">Average wait reduced</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-black">1</p>
                <p className="text-sm text-gray-600">
                  Smart system for every department
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden lg:flex justify-center">
            <div className="bg-gray-200 rounded-2xl w-full h-96 flex items-center justify-center">
              <img
                src="https://via.placeholder.com/400x400?text=Q-SMART+Demo"
                alt="Q-SMART Dashboard"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Live Operations Dashboard Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Live Operations Dashboard
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Real-time queue visibility across every department
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div>
                      <p className="font-semibold text-blue-900">
                        Currently serving
                      </p>
                      <p className="text-2xl font-bold text-black">B042</p>
                      <p className="text-sm text-gray-600">Loan Applications</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Open</p>
                      <p className="text-sm text-gray-600">4 staff online</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    {
                      ticket: "B043",
                      name: "Sarah Connor",
                      wait: "16 min",
                      status: "Next",
                    },
                    {
                      ticket: "B044",
                      name: "James Wilson",
                      wait: "24 min",
                      status: "Waiting",
                    },
                    {
                      ticket: "A110",
                      name: "Maria Garcia",
                      wait: "5 min",
                      status: "Waiting",
                    },
                    {
                      ticket: "C221",
                      name: "David Miller",
                      wait: "38 min",
                      status: "Waiting",
                    },
                  ].map((item) => (
                    <div
                      key={item.ticket}
                      className="flex items-center justify-between text-sm py-2 border-b border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-blue-900">
                          {item.ticket}
                        </span>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-600">{item.wait}</span>
                        <span className="text-xs text-gray-600 ml-2">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-blue-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800">
                  Call Next
                </button>
                <button className="w-full border border-blue-900 text-blue-900 py-2 rounded-lg font-medium mt-2 hover:bg-blue-900 hover:text-white">
                  Mark Served
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-black mb-6">
                A complete operating system for modern queueing
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Designed for high-trust service environments where clarity,
                timing, and coordination matter.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-900 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">
                      Remote check-in
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Customers join from home through a simple browser web
                      portal.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-900 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">
                      Live notifications
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Approaching turn and now-serving alerts via browser and
                      SMS.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-900 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">
                      Department control
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Run separate profiles, counters, and service types one
                      workspace.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-black mb-12 text-center">
          Everything you need for modern queueing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Remote check-in",
              description:
                "Customers join from home through a simple browser web portal.",
            },
            {
              title: "Live notifications",
              description:
                "Approaching turn and now-serving alerts via browser and SMS.",
            },
            {
              title: "Department control",
              description:
                "Run separate profiles, counters, and service types in one workspace.",
            },
            {
              title: "Walk-in support",
              description:
                "Handle kiosk check-in and staff-assisted entry via queueing logic.",
            },
            {
              title: "Dynamic wait times",
              description:
                "Estimates update in real-time based on service speeds.",
            },
            {
              title: "Operational analytics",
              description:
                "Track no-shows, service duration, throughput, and staff efficiency.",
            },
          ].map((feature, idx) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section id="solutions" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-black mb-12">
            Built for high-volume service teams
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Q-SMART fits environments where customer trust depends on
            predictable wait times and a polished arrival experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              "Banks and financial service branches",
              "Clinics and outpatient centers",
              "Government offices and citizen service desks",
              "Retail support counters and service hubs",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-900 text-white">
                    ✓
                  </div>
                </div>
                <span className="text-gray-900">{item}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8">
              <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
              <p className="text-sm text-gray-600">
                Service delivery that builds trust
              </p>
            </div>
            <div className="bg-white rounded-xl p-8">
              <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
              <p className="text-sm text-gray-600">
                Clean operations, better outcomes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black/50 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Replace the line without disrupting the way your team works.
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Launch a premium remote queue experience for customers while giving
            staff a faster, cleaner operational dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200">
              Start your 14-day trial
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition">
              Talk to sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-gray-400 py-12 border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <span className="text-white font-bold text-lg">Q-SMART</span>
              <p className="text-sm mt-2">
                Remote queueing for modern service teams.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} Q-SMART. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-white">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
