"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Promotions {
  id: number;
  image: File | string;
}

export default function Promotions() {
  const [promotions, setPromotions] = useState<Promotions[]>([
    {
      id: 1,
      image: "/images/products/acer-aspire-a514-53.png",
    },
    {
      id: 2,
      image: "/images/products/acer-aspire-a514-53.png",
    },
    {
      id: 3,
      image: "/images/products/acer-aspire-a514-53.png",
    },
    {
      id: 4,
      image: "/images/products/acer-aspire-a514-53.png",
    },
    {
      id: 5,
      image: "/images/products/acer-aspire-a514-53.png",
    },
    {
      id: 6,
      image: "/images/products/acer-aspire-a514-53.png",
    },
    {
      id: 7,
      image: "/images/products/acer-aspire-a514-53.png",
    },
    {
      id: 8,
      image: "/images/products/acer-aspire-a514-53.png",
    },
    {
      id: 9,
      image: "/images/products/acer-aspire-a514-53.png",
    },
    {
      id: 10,
      image: "/images/products/acer-aspire-a514-53.png",
    },
    {
      id: 11,
      image: "/images/products/acer-aspire-a514-53.png",
    },
    {
      id: 12,
      image: "/images/products/acer-aspire-a514-53.png",
    },
  ]);

  const [editingPromotions, setEditingPromotions] = useState<Promotions | null>(
    null
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [newPromotions, setNewPromotions] = useState<Omit<Promotions, "id">>({
    image: "",
  });

  // Search and pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Promotions;
    direction: "ascending" | "descending";
  } | null>(null);

  // Filter and sort promotions
  const filteredAndSortedPromotions = React.useMemo(() => {
    let result = promotions;

    if (sortConfig !== null) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [promotions, searchTerm, sortConfig]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedPromotions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(
    filteredAndSortedPromotions.length / itemsPerPage
  );

  const handleAddPromotions = () => {
    const newPromotionsWithId = {
      id: Date.now(),
      ...newPromotions,
      image:
        newPromotions.image instanceof File
          ? URL.createObjectURL(newPromotions.image)
          : newPromotions.image,
    };
    setPromotions([...promotions, newPromotionsWithId]);
    setNewPromotions({ image: "" });
    setIsAddDialogOpen(false);
  };

  const handleEditPromotions = () => {
    if (editingPromotions) {
      setPromotions(
        promotions.map((p) =>
          p.id === editingPromotions.id
            ? {
                ...editingPromotions,
                image:
                  editingPromotions.image instanceof File
                    ? URL.createObjectURL(editingPromotions.image)
                    : editingPromotions.image,
              }
            : p
        )
      );
      setIsEditDialogOpen(false);
    }
  };

  const handleDeletePromotions = () => {
    if (editingPromotions) {
      setPromotions(promotions.filter((p) => p.id !== editingPromotions.id));
      setIsDeleteDialogOpen(false);
    }
  };

  const requestSort = (key: keyof Promotions) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <CardTitle className="text-3xl font-bold">Promotions Dashboard</CardTitle>
      <CardDescription className="mb-5">
        Manage your promotions inventory
      </CardDescription>
      <Card className="w-full  shadow-md">
        <CardHeader>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Promotions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild className="bg-yellow">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Promotions
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Promotions</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new promotions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Promotions Image
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setNewPromotions({ ...newPromotions, image: file });
                        }
                      }}
                      className="col-span-3"
                    />
                  </div>
                  {newPromotions.image instanceof File && (
                    <div className="col-span-4 flex justify-center">
                      <img
                        src={URL.createObjectURL(newPromotions.image)}
                        alt="New promotions preview"
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button onClick={handleAddPromotions}>Add Promotions</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((promotions) => (
                <TableRow key={promotions.id}>
                  <TableCell>
                    <img
                      src={
                        promotions.image instanceof File
                          ? URL.createObjectURL(promotions.image)
                          : promotions.image
                      }
                      alt="gambar-product"
                      width={200}
                      height={200}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingPromotions(promotions);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingPromotions(promotions);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Promotions</DialogTitle>
            <DialogDescription>
              Make changes to the promotions details.
            </DialogDescription>
          </DialogHeader>
          {editingPromotions && (
            <div className="flex flex-col gap-4 py-4">
              <div className="items-center gap-4">
                <Label htmlFor="edit-image" className="text-right">
                  Promotions Image
                </Label>
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && editingPromotions) {
                      setEditingPromotions({
                        ...editingPromotions,
                        image: file,
                      });
                    }
                  }}
                />
              </div>
              {editingPromotions && (
                <div className="col-span-4 flex justify-center">
                  <img
                    src={
                      editingPromotions.image instanceof File
                        ? URL.createObjectURL(editingPromotions.image)
                        : editingPromotions.image
                    }
                    alt="Editing promotions preview"
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleEditPromotions}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this promotions? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePromotions}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
