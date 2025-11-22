import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  featured?: boolean;
}

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Academics":
      return "📚";
    case "Sports":
      return "🏆";
    case "Events":
      return "🎉";
    case "Announcements":
      return "📢";
    case "Student Life":
      return "👥";
    case "Faculty":
      return "👨‍🏫";
    default:
      return "📰";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Academics":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Sports":
      return "bg-green-100 text-green-800 border-green-200";
    case "Events":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Announcements":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Student Life":
      return "bg-pink-100 text-pink-800 border-pink-200";
    case "Faculty":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export function NewsCard({ article, featured = false }: NewsCardProps) {
  return (
    <Card
      className={`group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-white ${
        featured
          ? "shadow-xl ring-2 ring-blue-100 bg-gradient-to-br from-white to-blue-50"
          : "shadow-md hover:shadow-xl"
      }`}
    >
      {featured && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-t-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Featured Story</span>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {getCategoryIcon(article.category)}
              </span>
              <Badge
                variant="secondary"
                className={`${getCategoryColor(
                  article.category
                )} border font-medium`}
              >
                {article.category}
              </Badge>
            </div>
            <CardTitle
              className={`leading-tight ${
                featured ? "text-xl" : "text-lg"
              } group-hover:text-blue-600 transition-colors`}
            >
              {article.title}
            </CardTitle>
          </div>
        </div>

        <CardDescription className="flex flex-wrap items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-gray-500">
            <Calendar className="w-4 h-4" />
            {article.date}
          </span>
          <span className="flex items-center gap-1.5 text-gray-500">
            <User className="w-4 h-4" />
            {article.author}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
          {article.content}
        </p>

        <Button
          variant="ghost"
          size="sm"
          className="group/btn p-0 h-auto text-blue-600 hover:text-blue-700 hover:bg-transparent"
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            <BookOpen className="w-4 h-4" />
            Read full article
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
