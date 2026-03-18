import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  CalendarDays, Bell, BookOpen, BarChart3, ChevronDown,
  GraduationCap, Building2, Library, Globe2, Zap, Shield,
  Cloud, Users, ArrowRight, Check, Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
};

const HomePage = () => {
  const { user } = useAuthStore();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const features = [
    { icon: CalendarDays, title: "Smart Timetable", desc: "Intelligent scheduling that auto-detects conflicts and organises your week visually.", color: "#2563eb" },
    { icon: Bell, title: "Real-time Alerts", desc: "Instant push notifications for class changes, cancellations, and exam reminders.", color: "#7c3aed" },
    { icon: BookOpen, title: "Exam Tracking", desc: "Keep all your assessments, deadlines, and assignment due dates in one place.", color: "#0891b2" },
    { icon: BarChart3, title: "Attendance Overview", desc: "Monitor attendance rates per module and get warned before hitting the limit.", color: "#059669" },
  ];

  const stats = [
    { icon: GraduationCap, value: "20,000+", label: "Students" },
    { icon: Building2, value: "5+", label: "Campuses" },
    { icon: Library, value: "100+", label: "Programmes" },
    { icon: Globe2, value: "200+", label: "Industry Partners" },
  ];

  const steps = [
    { n: "01", title: "Register", desc: "Create your student account with your campus email in under a minute." },
    { n: "02", title: "Add Courses", desc: "Search and add all your enrolled modules to your personal timetable." },
    { n: "03", title: "View Schedule", desc: "See your week at a glance — lectures, labs, tutorials, and exams." },
    { n: "04", title: "Stay Updated", desc: "Get notified instantly when anything in your schedule changes." },
  ];

  const whys = [
    { icon: Zap, title: "Easy to Use", desc: "Intuitive interface designed for students, not IT admins." },
    { icon: Shield, title: "Secure Access", desc: "Campus SSO and encrypted data keeps your info safe." },
    { icon: Cloud, title: "Cloud-Based", desc: "Access from any device — laptop, phone, or tablet." },
    { icon: Users, title: "Built for Students", desc: "Every feature was designed with student workflows in mind." },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Outfit', sans-serif", backgroundColor: "#f8fafc" }}>

      {/* ── HERO ── */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/university-campus.jpg')" }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.82) 0%, rgba(37,99,235,0.55) 100%)" }} />
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: "#2563eb" }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
            style={{ background: "#7c3aed" }} />
        </motion.div>

        <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ opacity: heroOpacity }}>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase"
            style={{ background: "rgba(37,99,235,0.25)", border: "1px solid rgba(37,99,235,0.4)", color: "#93c5fd" }}>
            <Star size={12} fill="#93c5fd" /> Academic Schedule Management System
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ letterSpacing: "-2px" }}>
            Manage Your Academic<br />
            <span style={{ background: "linear-gradient(90deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Schedule Smartly
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }}>
            Plan classes, track lectures, manage exams, and stay organised — all in one place.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="flex flex-wrap gap-4 justify-center">
            <Link to="/timetable">
              <button className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl"
                style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 8px 32px rgba(37,99,235,0.4)" }}>
                Get Started <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>

          {user && (
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={4}
              className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Welcome back, <span className="text-white font-semibold">{user.name}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Scroll</span>
          <ChevronDown size={20} style={{ color: "rgba(255,255,255,0.4)" }} />
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#2563eb" }}>Features</p>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#0f172a", letterSpacing: "-1px" }}>
              Everything you need to stay on track
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "#64748b" }}>
              Designed specifically for university students juggling multiple modules, deadlines, and commitments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i}
                whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(0,0,0,0.1)" }}
                className="rounded-2xl p-6 border transition-all cursor-default"
                style={{ borderColor: "#e2e8f0", background: "#fafafa" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}18` }}>
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <h3 className="font-bold mb-2 text-base" style={{ color: "#0f172a" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SYSTEM ── */}
      <section id="about" className="py-24 px-6" style={{ background: "#f1f5f9" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="rounded-2xl overflow-hidden shadow-2xl relative" style={{ height: 400 }}>
              <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/university-campus.jpg')" }} />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.7), rgba(124,58,237,0.5))" }} />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <p className="text-white font-bold text-lg mb-1">Today's Overview</p>
                  <div className="flex gap-4 mt-2">
                    {["3 Lectures", "1 Lab", "2 Tutorials"].map(t => (
                      <span key={t} className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#2563eb" }}>About the System</p>
            <h2 className="text-4xl font-bold mb-6" style={{ color: "#0f172a", letterSpacing: "-1px" }}>
              Built for the modern university student
            </h2>
            <div className="space-y-4">
              {[
                "Manage your complete lecture schedule in one place",
                "View and track upcoming exam timetables easily",
                "Get real-time updates whenever a class is changed",
                "Avoid scheduling conflicts with smart alerts",
                "Access your timetable from any mobile device",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "#dbeafe" }}>
                    <Check size={12} style={{ color: "#2563eb" }} />
                  </div>
                  <p className="text-sm" style={{ color: "#475569" }}>{item}</p>
                </div>
              ))}
            </div>
            <Link to="/signup">
              <button className="mt-8 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "#2563eb" }}>
                Start for free <ArrowRight size={16} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT SLIIT ── */}
      <section className="py-24 px-6" style={{ background: "#0f172a" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#60a5fa" }}>Our University</p>
            <h2 className="text-4xl font-bold mb-4 text-white" style={{ letterSpacing: "-1px" }}>About SLIIT</h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#94a3b8" }}>
              Sri Lanka Institute of Information Technology is a leading private degree-awarding institute committed to quality education, innovation, and industry-relevant learning. With modern facilities and a student-first approach, SLIIT prepares graduates for the global tech landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i}
                className="text-center rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <s.icon size={28} className="mx-auto mb-3" style={{ color: "#60a5fa" }} />
                <p className="text-3xl font-bold text-white mb-1" style={{ letterSpacing: "-1px" }}>{s.value}</p>
                <p className="text-sm" style={{ color: "#64748b" }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="py-24 px-6" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#2563eb" }}>Why Us</p>
            <h2 className="text-4xl font-bold" style={{ color: "#0f172a", letterSpacing: "-1px" }}>Why choose this system?</h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6">
            {whys.map((w, i) => (
              <motion.div key={w.title} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i}
                className="text-center rounded-2xl p-6"
                style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, #dbeafe, #ede9fe)" }}>
                  <w.icon size={24} style={{ color: "#2563eb" }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: "#0f172a" }}>{w.title}</h3>
                <p className="text-sm" style={{ color: "#64748b" }}>{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6" style={{ background: "#f1f5f9" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#2563eb" }}>Process</p>
            <h2 className="text-4xl font-bold" style={{ color: "#0f172a", letterSpacing: "-1px" }}>How it works</h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5"
              style={{ background: "linear-gradient(90deg, #2563eb, #7c3aed)" }} />
            {steps.map((s, i) => (
              <motion.div key={s.n} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i} className="relative text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10"
                  style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", boxShadow: "0 8px 24px rgba(37,99,235,0.3)" }}>
                  <span className="text-2xl font-black text-white">{s.n}</span>
                </div>
                <h3 className="font-bold mb-2 text-base" style={{ color: "#0f172a" }}>{s.title}</h3>
                <p className="text-sm" style={{ color: "#64748b" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #4f46e5 100%)" }}>
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2"
          style={{ background: "#fff" }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl translate-x-1/2 translate-y-1/2"
          style={{ background: "#fff" }} />
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ letterSpacing: "-1.5px" }}>
            Stay Organised.<br />Stay Ahead.
          </h2>
          <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.75)" }}>
            Join thousands of SLIIT students already managing their academic schedules smarter.
          </p>
          <Link to="/signup">
            <button className="px-10 py-4 rounded-xl text-base font-bold text-blue-700 transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
              Start Managing Your Schedule Today
            </button>
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6" style={{ background: "#0f172a" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 mb-8"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="font-bold text-2xl" style={{ color: "#fff", letterSpacing: "-0.5px" }}>
              Uni<span style={{ color: "#2563eb" }}>Schedule</span>
            </span>
            <div className="flex gap-8">
              {["Home", "Features", "About", "Contact"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="text-sm transition-colors"
                  style={{ color: "#64748b" }}>{l}</a>
              ))}
            </div>
            <div className="flex gap-3">
              {["FB", "TW", "IG", "LI"].map(s => (
                <div key={s} className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-sm" style={{ color: "#475569" }}>
            © {new Date().getFullYear()} UniSchedule — SLIIT Academic Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;