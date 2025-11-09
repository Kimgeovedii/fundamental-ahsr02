"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2 } from "lucide-react";

interface BlogProps {
  objectId: string;
  title: string;
  description: string | null | undefined;
  authorName: string;
  onEdit: (blogId: string) => void;
  onDelete: (blogId: string) => void;
}

const MAX_DESCRIPTION_LENGTH = 200;
const MAX_TITLE_LENGTH = 40;

const truncateText = (text: string | null | undefined, maxLength: number) => {
  if (!text || typeof text !== "string") {
    return "";
  }

  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const BlogCard: React.FC<BlogProps> = ({
  objectId,
  title,
  description,
  authorName,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">
            {truncateText(title, MAX_TITLE_LENGTH)}
          </CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(objectId)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(objectId)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="text-sm text-gray-500 mt-1">
          Oleh: **{authorName || "Anonim"}**
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-base leading-relaxed text-gray-700">
          {truncateText(description, MAX_DESCRIPTION_LENGTH) ||
            "Deskripsi tidak tersedia."}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end pt-0">
        <Button variant="link" size="sm">
          Baca Selengkapnya
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
