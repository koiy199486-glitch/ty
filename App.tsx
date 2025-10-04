
import React, { useState, useCallback } from 'react';
import { Page } from './types.ts';
import { SocialIcons } from './components/ui/SocialIcons.tsx';

// --- Icon Components ---
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mx-auto"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mx-auto"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mx-auto"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mx-auto"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9z"/></svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 text-white"><path d="M8 5v14l11-7z"></path></svg>;

// --- Mock Data ---
const subjects = ["التربية الاسلامية", "اللغة العربية", "اللغة الانكليزية"];
const courses = [
  { id: 1, title: "كورس التفوق الأول", price: "200,000 د.ع", image: "https://picsum.photos/seed/course1/400/300" },
  { id: 2, title: "كورس التفوق الثاني", price: "300,000 د.ع", image: "https://picsum.photos/seed/course2/400/300" },
  { id: 3, title: "كورس التفوق الثالث", price: "250,000 د.ع", image: "https://picsum.photos/seed/course3/400/300" },
];
const teachers = [
    { id: 1, name: "أ. احمد خالد", specialty: "الفيزياء", image: "https://picsum.photos/seed/teacher1/200/200"},
    { id: 2, name: "أ. فاطمة علي", specialty: "الكيمياء", image: "https://picsum.photos/seed/teacher2/200/200"},
    { id: 3, name: "أ. يوسف محمد", specialty: "الرياضيات", image: "https://picsum.photos/seed/teacher3/200/200"},
];
const assignments = [
    { id: 1, title: "واجب المحاضرة الأولى", timed: true, submitted: false, requiresCamera: true },
    { id: 2, title: "واجب المحاضرة الأولى", timed: true, submitted: true, requiresCamera: true },
    { id: 3, title: "واجب المحاضرة الأولى", timed: false, submitted: true, requiresCamera: false },
    { id: 4, title: "واجب المحاضرة الأولى", timed: true, submitted: false, requiresCamera: true },
]

// --- Layout Components ---
const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const Logo = () => (
    <div className="text-white text-center">
      <h1 className="text-5xl font-bold tracking-wider">التراث</h1>
      <span className="text-lg tracking-widest">Academy</span>
    </div>
  );
  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto shadow-2xl">
      <header className="relative bg-purple-700 h-64 flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute -bottom-24 -left-20 w-60 h-60 bg-teal-500/30 rounded-full filter blur-xl"></div>
        <div className="relative z-10">
          <Logo />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-white" style={{ clipPath: 'ellipse(80% 100% at 50% 100%)' }}></div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center px-6 -mt-16 z-10 text-center">
        {children}
      </main>
      <footer className="py-8">
        <SocialIcons />
      </footer>
    </div>
  );
};

const AppLayout: React.FC<{ children: React.ReactNode, footer?: boolean }> = ({ children, footer=true }) => (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col max-w-md mx-auto shadow-2xl">
        <main className="flex-grow">
            {children}
        </main>
        {footer && <AppFooter />}
    </div>
);

const AppFooter = () => (
    <footer className="bg-gray-800 p-2 sticky bottom-0 z-50">
        <div className="flex justify-around items-center text-xs text-gray-400">
            <button className="text-center hover:text-white">
                <HomeIcon />
                <span>الرئيسية</span>
            </button>
            <button className="text-center hover:text-white">
                <BriefcaseIcon />
                <span>رسائلي</span>
            </button>
            <button className="text-center hover:text-white relative">
                <BellIcon />
                <span className="absolute top-0 right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full">1</span>
                <span>الاشعارات</span>
            </button>
            <button className="text-center hover:text-white">
                <MenuIcon />
                <span>قائمة</span>
            </button>
        </div>
    </footer>
);

// --- Page Components ---
const WelcomeScreen: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
    <AuthLayout>
        <div className="w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">مرحباً بك!</h2>
            <div className="space-y-4">
                <button onClick={() => onNavigate(Page.Terms)} className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105">
                    انشاء حساب جديد
                </button>
                <button onClick={() => onNavigate(Page.Login)} className="w-full bg-white text-purple-600 font-bold py-3 px-4 rounded-full border-2 border-purple-600 hover:bg-purple-50 transition-transform transform hover:scale-105">
                    تسجيل دخول
                </button>
            </div>
        </div>
    </AuthLayout>
);

const LoginScreen: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
    <AuthLayout>
        <div className="w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">أهلاً بعودتك!</h2>
            <form className="space-y-6 text-right">
                <input type="text" placeholder="اسم المستخدم" className="w-full p-4 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <input type="password" placeholder="كلمة المرور" className="w-full p-4 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <div className="flex justify-between items-center text-sm px-2">
                    <a href="#" className="text-purple-600 hover:underline">نسيت كلمة المرور؟</a>
                    <label className="flex items-center space-x-2 text-gray-600">
                        <span>تذكرني</span>
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600 rounded" />
                    </label>
                </div>
                <button type="button" onClick={() => onNavigate(Page.Home)} className="w-full bg-white text-purple-600 font-bold py-3 px-4 rounded-full border-2 border-purple-600 hover:bg-purple-50 transition-transform transform hover:scale-105">
                    تسجيل دخول
                </button>
            </form>
            <p className="mt-6 text-sm text-gray-600">
                مستخدم جديد؟ <button onClick={() => onNavigate(Page.SignUp)} className="text-purple-600 font-bold hover:underline">إنشاء حساب</button>
            </p>
        </div>
    </AuthLayout>
);

const TermsScreen: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto shadow-2xl">
      <header className="relative bg-purple-700 h-48 flex items-center justify-center p-6 overflow-hidden">
        <div className="relative z-10 text-white text-center">
            <h1 className="text-4xl font-bold tracking-wider">التراث</h1>
            <span className="text-md tracking-widest">Academy</span>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-white" style={{ clipPath: 'ellipse(80% 100% at 50% 100%)' }}></div>
      </header>
       <main className="flex-grow p-6 text-gray-700 text-right overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-4">شروط الاستخدام</h2>
        <p className="text-sm leading-relaxed">
            لقبول بالشروط باستخدامك لبرنامج الأكاديمية، فإنك توافق على الالتزام بهذه الشروط وسياسات ذات الصلة. إذا كنت لا توافق، يرجى عدم استخدام البرنامج.
            <br/><br/>
            <strong>حقوق النشر والملكية الفكرية</strong>
            <br/>
            جميع المحاضرات والمحتوى التعليمي المنشور في البرنامج مملوك لأساتذة أو لإدارة الأكاديمية. يمنع نسخ أو إعادة نشر أو توزيع أي محتوى إلا بإذن كتابي من صاحب الحق.
            <br/><br/>
            <strong>مسؤوليات الأساتذة</strong>
            <br/>
            على الأساتذة التأكد من أن المحتوى المقدم أصلي وغير منسوخ من أي طرف أخرى دون إذن. يجب أن يكون المحتوى خاليا من أي مواد مسيئة أو مخالفة للقوانين المحلية.
             <br/><br/>
            <strong>استخدام الطلاب للمحتوى</strong>
            <br/>
            يسمح للطلاب باستخدام المحاضرات للأغراض التعليمية والشخصية فقط. يمنع مشاركة المحتوى مع أشخاص غير مسجلين في البرنامج أو بيعه أو إعادة نشره.
        </p>
       </main>
      <footer className="p-6 bg-white sticky bottom-0">
        <button onClick={() => onNavigate(Page.SignUp)} className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-purple-700">
            استمرار
        </button>
      </footer>
    </div>
);

const SignUpScreen: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto shadow-2xl">
        <main className="flex-grow flex flex-col items-center justify-center p-6 relative">
             <div className="absolute bottom-0 left-0 w-full h-40 bg-purple-600" style={{clipPath: 'ellipse(150% 100% at -50% 100%)'}}></div>
             <div className="absolute bottom-0 right-0 w-full h-40 bg-cyan-400" style={{clipPath: 'ellipse(150% 100% at 150% 100%)'}}></div>
            <div className="w-full z-10">
                 <input type="tel" placeholder="رقم الهاتف" className="w-full text-center p-4 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6" />
                 <button onClick={() => onNavigate(Page.Otp)} className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-purple-700">
                    إنشاء حساب
                </button>
            </div>
        </main>
        <footer className="py-8 z-10 bg-white"><SocialIcons /></footer>
    </div>
);

const OtpScreen: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between max-w-md mx-auto shadow-2xl p-6">
        <header className="w-full h-48 relative">
            <div className="absolute top-0 right-0 w-full h-full bg-purple-600" style={{clipPath: 'ellipse(120% 100% at 120% -20%)'}}></div>
            <div className="absolute top-0 left-0 w-full h-full bg-cyan-400" style={{clipPath: 'ellipse(120% 100% at -20% -20%)'}}></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-48 bg-white/50 border-4 border-gray-300 rounded-3xl backdrop-blur-sm"></div>
            </div>
        </header>

        <main className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-teal-600 mb-2">إكمال عملية التسجيل</h2>
            <p className="text-gray-600">ادخل الكود الذي تم ارساله الى الرقم</p>
            <p className="text-gray-800 font-bold mb-8" dir="ltr">964+ 780 599 7772</p>
            <div className="flex justify-center space-x-3" dir="ltr">
                {[...Array(4)].map((_, i) => (
                    <input key={i} type="text" maxLength={1} className="w-16 h-16 text-center text-3xl font-bold border-2 border-gray-200 rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                ))}
            </div>
            <p className="mt-6 text-sm text-gray-500">
                لم يصلك الكود؟ <a href="#" className="text-purple-600 font-bold hover:underline">اعد ارسال الكود</a>
            </p>
            <button onClick={() => onNavigate(Page.Home)} className="w-full mt-8 bg-purple-600 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-purple-700">
                تحقق
            </button>
        </main>

        <footer className="py-8"><SocialIcons /></footer>
    </div>
);

const HomeScreen: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
    <AppLayout>
        <div className="p-4 space-y-6">
            <header className="text-center font-bold">اسم التطبيق الانكليزي</header>
            <div className="bg-gray-700 h-32 rounded-lg flex items-center justify-center">
                <p>لوحة اعلانات متحركة</p>
            </div>
            
            {/* Subjects Section */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">المواد الدراسية</h3>
                    <a href="#" className="text-sm text-purple-400">عرض الكل</a>
                </div>
                <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
                    {subjects.map(subject => (
                        <div key={subject} className="flex-shrink-0 w-32 h-20 bg-gray-700 rounded-lg flex items-center justify-center p-2 text-center">
                            <span>{subject}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Courses Section */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">احدث الدورات</h3>
                    <a href="#" className="text-sm text-purple-400">عرض الكل</a>
                </div>
                <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
                    {courses.map(course => (
                        <div key={course.id} className="flex-shrink-0 w-40 bg-gray-800 rounded-lg overflow-hidden cursor-pointer" onClick={() => onNavigate(Page.TeacherProfile)}>
                            <img src={course.image} alt={course.title} className="w-full h-24 object-cover" />
                            <div className="p-2 bg-purple-800 text-center">
                                <h4 className="text-sm font-semibold">{course.title}</h4>
                                <p className="text-xs text-gray-300">{course.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Teachers Section */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">مدرسين انضمو حديثا</h3>
                    <a href="#" className="text-sm text-purple-400">عرض الكل</a>
                </div>
                <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
                    {teachers.map(teacher => (
                         <div key={teacher.id} className="flex-shrink-0 w-40 bg-gray-800 rounded-lg overflow-hidden">
                            <img src={teacher.image} alt={teacher.name} className="w-full h-24 object-cover" />
                            <div className="p-2 bg-purple-800 text-center">
                                <h4 className="text-sm font-semibold">{teacher.name}</h4>
                                <p className="text-xs text-gray-300">{teacher.specialty}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </AppLayout>
);

const TeacherProfileScreen: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('courses');

    const TabButton: React.FC<{ name: string; label: string }> = ({ name, label }) => (
        <button
            onClick={() => setActiveTab(name)}
            className={`flex-1 pb-2 font-semibold ${activeTab === name ? 'border-b-2 border-purple-400 text-white' : 'text-gray-400'}`}
        >
            {label}
        </button>
    );

    return (
        <AppLayout footer={false}>
            <header className="bg-gray-800 p-4 pt-12 flex items-center space-x-4">
                <img src="https://picsum.photos/seed/teacher1/200/200" alt="Teacher" className="w-20 h-20 rounded-lg object-cover" />
                <div>
                    <h2 className="text-xl font-bold">اسم الاستاذ</h2>
                    <p className="text-gray-400">الاختصاص</p>
                </div>
            </header>
            <div className="sticky top-0 bg-gray-900 z-10">
                <nav className="flex justify-around border-b border-gray-700">
                    <TabButton name="courses" label="الدورات" />
                    <TabButton name="assignments" label="الواجبات" />
                    <TabButton name="exams" label="الامتحانات" />
                    <TabButton name="results" label="النتائج" />
                </nav>
            </div>
            <div className="p-4">
                {activeTab === 'courses' && (
                    <div className="grid grid-cols-2 gap-4">
                        {courses.slice(0, 2).map(course => (
                            <div key={course.id} className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer" onClick={() => onNavigate(Page.CourseDetails)}>
                                <img src={course.image} alt={course.title} className="w-full h-28 object-cover"/>
                                <div className="p-3 text-center bg-gray-700">
                                    <h4 className="font-bold">{course.title}</h4>
                                    <p className="text-sm text-gray-400">السعر ب IQ</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'assignments' && (
                    <div className="space-y-3">
                        {assignments.map(a => (
                            <div key={a.id} className="bg-purple-800 p-3 rounded-lg flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`flex items-center space-x-1 text-xs ${a.requiresCamera ? 'text-red-400' : 'text-gray-400'}`}>
                                        <EyeIcon/>
                                        <span>كاميرا</span>
                                    </div>
                                    <div className={`flex items-center space-x-1 text-xs ${a.timed ? 'text-yellow-400' : 'text-gray-400'}`}>
                                        <LockIcon/>
                                        <span>مؤقت</span>
                                    </div>
                                    <span>{a.title}</span>
                                </div>
                                <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-sm">1</div>
                            </div>
                        ))}
                         <p className="text-xs text-center text-gray-500 mt-2">تحتاج للوصول الى الكاميرا</p>
                    </div>
                )}
                 {activeTab === 'exams' && (
                     <div className="space-y-3">
                        {assignments.map(a => (
                            <div key={a.id} className="bg-purple-800 p-3 rounded-lg flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-1 text-xs text-red-400"><EyeIcon/></div>
                                    <div className="flex items-center space-x-1 text-xs text-yellow-400"><LockIcon/></div>
                                    <span>امتحان المحاضرة {a.id}</span>
                                </div>
                                <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-sm">1</div>
                            </div>
                        ))}
                         <p className="text-xs text-center text-gray-500 mt-2">تحتاج للوصول الى الكاميرا</p>
                    </div>
                 )}
                 {activeTab === 'results' && (
                     <div className="space-y-3">
                        <div className="bg-purple-800 p-3 rounded-lg flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1 text-xs text-blue-400"><DownloadIcon/></div>
                                <span>درجة الامتحان من 100</span>
                            </div>
                             <div className="flex items-center space-x-2">
                                <span className="font-bold text-lg text-green-400">90</span>
                                <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-sm">1</div>
                            </div>
                        </div>
                        <p className="text-xs text-center text-gray-500 mt-2">اي الايقونه لا تظهر للطالب</p>
                     </div>
                 )}
            </div>
        </AppLayout>
    );
};

const CourseDetailScreen: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
    <AppLayout footer={false}>
        <div className="p-4 pt-12 space-y-3 bg-gray-800 min-h-screen">
             <h2 className="bg-gray-700 p-3 rounded-lg text-center font-bold">الكورس الاول</h2>
             {["الفصل الأول", "الثاني", "الثالث"].map(chapter => (
                 <details key={chapter} className="bg-gray-700 rounded-lg overflow-hidden">
                     <summary className="p-3 font-semibold flex justify-between items-center cursor-pointer">
                         <span>{chapter}</span>
                         <span className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">1</span>
                     </summary>
                     <div className="px-3 pb-3 space-y-2">
                         {[1, 2, 3].map(lecture => (
                            <div key={lecture} onClick={() => onNavigate(Page.Lecture)} className="bg-gray-600 p-3 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-500">
                               <span>محاضرة {lecture === 1 ? 'واحد' : lecture}</span>
                               <LockIcon />
                           </div>
                         ))}
                     </div>
                 </details>
             ))}
        </div>
    </AppLayout>
);

const LectureScreen: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('exams');

    const TabButton: React.FC<{ name: string; label: string }> = ({ name, label }) => (
        <button
            onClick={() => setActiveTab(name)}
            className={`flex-1 py-2 font-semibold text-sm ${activeTab === name ? 'border-b-2 border-purple-400 text-white' : 'text-gray-400'}`}
        >
            {label}
        </button>
    );
    
    const getScoreColor = (score: number) => {
        if (score <= 5) return 'text-red-500';
        if (score <= 7) return 'text-orange-400';
        return 'text-green-400';
    }

    return (
        <AppLayout footer={false}>
            <div className="bg-gray-800 min-h-screen">
                <header className="p-2 space-y-1 bg-gray-900">
                    <div className="text-red-500 text-sm text-center">الكورس الاول</div>
                    <div className="text-red-500 text-sm text-center">الفصل الاول</div>
                    <div className="text-center font-bold">محاضرة واحد</div>
                </header>

                <div className="p-4">
                    <div className="bg-gray-700 aspect-video rounded-lg flex items-center justify-center mb-4">
                        <PlayIcon />
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg text-center font-semibold mb-4">وصف المحاضرة</div>
                </div>
                
                 <div className="sticky top-0 bg-gray-800 z-10">
                    <nav className="flex justify-around border-b border-gray-700">
                        <TabButton name="assignments" label="الواجبات" />
                        <TabButton name="exams" label="الامتحانات" />
                        <TabButton name="results" label="النتائج" />
                    </nav>
                </div>

                <div className="p-4">
                    {activeTab === 'assignments' && (
                         <div className="space-y-3">
                            <div className="bg-purple-800 p-3 rounded-lg flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-1 text-xs text-red-400"><EyeIcon/></div>
                                    <div className="flex items-center space-x-1 text-xs text-yellow-400"><LockIcon/></div>
                                    <span>واجب المحاضرة الاولى</span>
                                </div>
                                <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-sm">1</div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'exams' && (
                        <div className="space-y-3">
                            <div className="bg-purple-800 p-3 rounded-lg flex items-center justify-between">
                                <span>امتحان المحاضرة الاولى</span>
                                <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-sm">1</div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'results' && (
                        <div className="space-y-4">
                             <div className="bg-purple-800 p-3 rounded-lg flex items-center justify-between font-semibold">
                                <span>امتحان من 10</span>
                                <div className="flex items-center space-x-2">
                                     <span>النتيجة :</span>
                                     <span className={`text-lg font-bold ${getScoreColor(9)}`}>9</span>
                                </div>
                            </div>
                             <button className="w-full bg-purple-700 p-3 rounded-lg text-center font-semibold">طلب اعادة الامتحان</button>
                             <div className="flex justify-between items-center">
                                <button className="bg-gray-700 p-3 rounded-lg flex-1 text-center font-semibold flex items-center justify-center space-x-2">
                                    <ChevronRightIcon />
                                    <span>المحاضرة السابقة</span>
                                </button>
                                <div className="px-4 text-2xl font-bold">&lt;&gt;</div>
                                <button className="bg-gray-700 p-3 rounded-lg flex-1 text-center font-semibold flex items-center justify-center space-x-2">
                                    <span>المحاضرة التالية</span>
                                    <ChevronLeftIcon />
                                </button>
                             </div>
                              <p className="text-xs text-center text-gray-500 mt-2">يرسل اشعار عبر التليكرام</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}

// --- Main App Component ---
function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Welcome);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Welcome:
        return <WelcomeScreen onNavigate={handleNavigate} />;
      case Page.Login:
        return <LoginScreen onNavigate={handleNavigate} />;
      case Page.Terms:
        return <TermsScreen onNavigate={handleNavigate} />;
      case Page.SignUp:
        return <SignUpScreen onNavigate={handleNavigate} />;
      case Page.Otp:
        return <OtpScreen onNavigate={handleNavigate} />;
      case Page.Home:
        return <HomeScreen onNavigate={handleNavigate} />;
      case Page.TeacherProfile:
          return <TeacherProfileScreen onNavigate={handleNavigate} />;
      case Page.CourseDetails:
          return <CourseDetailScreen onNavigate={handleNavigate} />;
      case Page.Lecture:
          return <LectureScreen onNavigate={handleNavigate} />;
      default:
        return <WelcomeScreen onNavigate={handleNavigate} />;
    }
  };

  return <div className="bg-gray-200">{renderPage()}</div>;
}

export default App;