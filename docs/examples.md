# Real Implementation Examples

Here's how we built our custom components with actual code from our project:

## From `components/document-uploader.tsx` - File Upload Component

```tsx
"use client";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, Plus } from "lucide-react";

// Dual-mode uploader: drag & drop or start from scratch
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
  {/* Start from scratch - LEFT */}
  <Card className="border-dashed border-secondary hover:border-primary transition-colors h-full">
    <div className="flex flex-col items-center justify-center rounded-lg p-8 text-center h-full">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
        <Plus className="h-8 w-8 text-secondary-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">Start from Scratch</h3>
      <Button onClick={onStartFromScratch}>Create New Summaries</Button>
    </div>
  </Card>

  {/* Drag & drop - RIGHT */}
  <Card className="border-dashed border-primary/50 hover:border-primary">
    <div
      {...getRootProps()}
      className={`cursor-pointer ${isDragActive ? "bg-primary/5" : ""}`}
    >
      <Upload className="h-8 w-8 text-primary" />
      <h3>Drag & drop your document</h3>
      <Button variant="outline">Select File</Button>
    </div>
  </Card>
</div>;
```

## From `components/summarized-pages-list.tsx` - Drag & Drop List

```tsx
// Reorderable list with drag & drop functionality using react-beautiful-dnd
<div className="space-y-2">
  {pageSummaries.map((summary, index) => (
    <div
      key={index}
      className={`group flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
        index === selectedPageIndex
          ? "bg-primary/10 border-primary"
          : "bg-card hover:bg-muted/50"
      }`}
      onClick={() => setSelectedPage(index)}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium truncate">{summary.title}</h4>
          <p className="text-xs text-muted-foreground truncate">
            {summary.content.substring(0, 100)}...
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {summary.imageUrl && <ImageIcon className="h-4 w-4 text-green-500" />}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDeletePage(index)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ))}
</div>
```

## From `components/home-page.tsx` - Feature Showcase Cards

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Brain, Search } from "lucide-react";

<Card className="library-card-hover group">
  <CardHeader>
    <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Upload className="w-6 h-6 text-amber-600 dark:text-amber-400" />
    </div>
    <CardTitle className="text-xl">رفع ذكي للمستندات</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground leading-relaxed">
      يحلل الذكاء الاصطناعي محتواك ويستخرج المعلومات المهمة تلقائياً
    </p>
    <Badge variant="secondary" className="mt-4">
      AI-Powered
    </Badge>
  </CardContent>
</Card>;
```

## From `components/ourstory-page.tsx` - Team Values Section

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scroll, BookOpen, Sparkles } from "lucide-react";

<Badge
  variant="outline"
  className="mb-6 px-4 py-2 text-sm font-medium border-amber-200 dark:border-amber-800"
>
  <Scroll className="w-4 h-4 mr-2" />
  رحلتنا
</Badge>

<Card className="library-card-hover">
  <CardHeader className="text-center">
    <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
      <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
    </div>
    <CardTitle>Accessibility</CardTitle>
  </CardHeader>
  <CardContent className="text-center">
    <p className="text-muted-foreground">
      Making knowledge accessible to learners of all backgrounds and abilities.
    </p>
  </CardContent>
</Card>
```

## From `components/terms-page.tsx` - Alert Usage

```tsx
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

<Alert className="mb-8 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
  <Info className="h-4 w-4 text-amber-600" />
  <AlertDescription className="text-amber-800 dark:text-amber-200">
    تم تحديث شروط الخدمة في 15 يناير 2024. يرجى مراجعة التغييرات الجديدة.
  </AlertDescription>
</Alert>

<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="acceptance">
    <AccordionTrigger className="text-right">
      قبول الشروط
    </AccordionTrigger>
    <AccordionContent className="text-right space-y-4">
      <p>
        باستخدام خدمات {APP_NAME}، فإنك توافق على الالتزام بهذه الشروط والأحكام.
      </p>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## From `components/navbar.tsx` - Responsive Navigation

```tsx
"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Book className="h-6 w-6" />
          <span className="font-bold text-xl">{APP_NAME}</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              الرئيسية
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/contact">
              <Mail className="h-4 w-4 mr-2" />
              تواصل معنا
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
    </nav>
  );
}
```

## From `components/page-viewer.tsx` - Content Display with Actions

```tsx
"use client";
import { useState } from "react";
import { Copy, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function PageViewer({
  page,
  pageIndex,
  onGenerateSummary,
  isSummarizing,
}) {
  const [editedPage, setEditedPage] = useState(page);

  const copyPageContent = () => {
    navigator.clipboard.writeText(editedPage).then(() => {
      toast.success("Copied to clipboard");
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Page {pageIndex + 1}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onGenerateSummary}
            disabled={isSummarizing}
          >
            {isSummarizing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Summary
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={copyPageContent}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="mt-4">
          <div className="min-h-[400px] p-4 border rounded-lg bg-muted/50">
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {editedPage}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

## From `components/library-page.tsx` - Grid Layout with Search

```tsx
"use client";
import { useState, useEffect } from "react";
import { Plus, Search, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">مكتبتي</h1>
        <Button onClick={() => router.push("/books/new")}>
          <Plus className="mr-2 h-4 w-4" />
          إضافة كتاب جديد
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="ابحث في مكتبتك..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="library-card-hover cursor-pointer">
            <CardContent className="p-4">
              <div className="aspect-[3/4] mb-4 bg-muted rounded-lg flex items-center justify-center">
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <BookOpen className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              <h3 className="font-semibold text-lg mb-2 truncate">
                {book.title}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {book.author}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                عرض
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

## From `components/summary-viewer.tsx` - Rich Text Editor with Image Upload

```tsx
"use client";
import { useState, useRef } from "react";
import { Upload, ImageIcon, X, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SummaryViewer({ pageSummary, onUpdateSummary }) {
  const [content, setContent] = useState(pageSummary?.content || "");
  const [title, setTitle] = useState(pageSummary?.title || "");
  const [imageUrl, setImageUrl] = useState(pageSummary?.imageUrl || "");
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Upload logic here
    const uploadedUrl = await uploadFile(file);
    setImageUrl(uploadedUrl);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">تحرير الملخص</h2>
        <div className="flex items-center space-x-2">
          <Switch
            id="mobile-preview"
            checked={isMobilePreview}
            onCheckedChange={setIsMobilePreview}
          />
          <Label htmlFor="mobile-preview">معاينة الجوال</Label>
        </div>
      </div>

      {/* Content Editor */}
      <Card>
        <CardHeader>
          <CardTitle>المحتوى</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title Input */}
          <div>
            <Label htmlFor="title">العنوان</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="أدخل عنوان الملخص..."
            />
          </div>

          {/* Content Textarea */}
          <div>
            <Label htmlFor="content">المحتوى</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="اكتب ملخصك هنا..."
              className="min-h-[200px]"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <Label>الصورة</Label>
            {imageUrl ? (
              <div className="relative">
                <img
                  src={imageUrl}
                  alt="Summary"
                  className="w-full max-w-md rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setImageUrl("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  انقر لرفع صورة أو اسحبها هنا
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

## From `components/contact-page.tsx` - Form with Validation States

```tsx
"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    const newErrors = {};
    if (!formData.name) newErrors.name = "الاسم مطلوب";
    if (!formData.email) newErrors.email = "البريد الإلكتروني مطلوب";
    if (!formData.message) newErrors.message = "الرسالة مطلوبة";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Submit logic here
    await submitForm(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            تواصل معنا
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            نحن هنا لمساعدتك
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>أرسل لنا رسالة</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="الاسم الكامل"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Textarea
                    placeholder="كيف يمكننا مساعدتك؟"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`min-h-[120px] ${
                      errors.message ? "border-destructive" : ""
                    }`}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاری الإرسال...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      إرسال الرسالة
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="library-card-hover">
              <CardHeader className="text-center">
                <Mail className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                <CardTitle>البريد الإلكتروني</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  تواصل معنا عبر البريد الإلكتروني للاستفسارات والدعم
                </p>
                <p className="font-medium mt-2">hello@wamdha.com</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
```
