import { useState } from "react";
import { Search, Filter, Download, Edit, RefreshCw, MoreHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ClientsDataTableProps {
  type: "clients" | "plans" | "dashboard";
}

export function ClientsDataTable({ type }: ClientsDataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Mock data - replace with real data in production
  const mockData = {
    clients: [
      { id: 1, name: "John Smith", email: "john@email.com", plan: "Premium Pool", status: "active", renewalDate: "2024-12-15", totalSpent: "$2,499" },
      { id: 2, name: "Sarah Johnson", email: "sarah@email.com", plan: "Standard Pool", status: "expiring", renewalDate: "2024-10-05", totalSpent: "$1,299" },
      { id: 3, name: "Mike Wilson", email: "mike@email.com", plan: "Luxury Pool", status: "active", renewalDate: "2025-01-20", totalSpent: "$4,999" },
      { id: 4, name: "Emily Davis", email: "emily@email.com", plan: "Basic Pool", status: "expired", renewalDate: "2024-09-12", totalSpent: "$899" },
    ],
    plans: [
      { id: 1, name: "Modern Infinity Pool", category: "Luxury", downloads: 45, status: "popular", price: "$499", rating: "4.9" },
      { id: 2, name: "Family Backyard Pool", category: "Standard", downloads: 32, status: "active", price: "$299", rating: "4.7" },
      { id: 3, name: "Rooftop Pool Design", category: "Premium", downloads: 18, status: "new", price: "$699", rating: "4.8" },
      { id: 4, name: "Natural Stone Pool", category: "Luxury", downloads: 67, status: "popular", price: "$799", rating: "4.9" },
    ]
  };

  const data = type === "plans" ? mockData.plans : mockData.clients;
  const title = type === "plans" ? "Pool Plans Management" : 
               type === "clients" ? "Client Management" : "Recent Activity";

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === "all" || 
     (type === "plans" ? ('category' in item && item.category?.toLowerCase() === filterCategory) : 
      item.status === filterCategory))
  );

  const renderTableHeaders = () => {
    if (type === "plans") {
      return (
        <>
          <TableHead>Plan Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Downloads</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </>
      );
    } else {
      return (
        <>
          <TableHead>Client Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Plan Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Renewal Date</TableHead>
          <TableHead>Actions</TableHead>
        </>
      );
    }
  };

  const renderTableRow = (item: any) => {
    if (type === "plans") {
      return (
        <>
          <TableCell className="font-medium">{item.name}</TableCell>
          <TableCell>{item.category}</TableCell>
          <TableCell>{item.downloads}</TableCell>
          <TableCell>
            <StatusBadge status={item.status} />
          </TableCell>
          <TableCell className="font-semibold">{item.price}</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Plan
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </>
      );
    } else {
      return (
        <>
          <TableCell className="font-medium">{item.name}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>{item.plan}</TableCell>
          <TableCell>
            <StatusBadge status={item.status} />
          </TableCell>
          <TableCell>{item.renewalDate}</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Client
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Renew Plan
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </>
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="border border-border shadow-custom-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            {title}
          </CardTitle>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={`Search ${type}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {type}</SelectItem>
                  {type === "plans" ? (
                    <>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="expiring">Expiring</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by..." />
                  <ChevronDown className="w-4 h-4 ml-2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {renderTableHeaders()}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                    {renderTableRow(item)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No {type} found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}