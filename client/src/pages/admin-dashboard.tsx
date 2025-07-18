import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { LoadingOverlay } from "@/components/loading-overlay";
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  LogOut, 
  GraduationCap,
  Mail,
  Phone,
  Clock,
  Calendar,
  User
} from "lucide-react";
import { format } from "date-fns";
import type { Enrollment, ContactMessage } from "@shared/schema";

export default function AdminDashboard() {
  const { user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("enrollments");

  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery<Enrollment[]>({
    queryKey: ["/api/enrollments"],
    enabled: !!user,
  });

  const { data: contactMessages, isLoading: messagesLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact"],
    enabled: !!user,
  });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  const stats = [
    {
      title: "Total Enrollments",
      value: enrollments?.length || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Courses",
      value: 6,
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "New Messages",
      value: contactMessages?.filter(msg => !msg.isRead).length || 0,
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Success Rate",
      value: "98%",
      icon: GraduationCap,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  if (enrollmentsLoading || messagesLoading) {
    return <LoadingOverlay isVisible={true} message="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Welcome, {user?.username}</span>
              <Button
                variant="ghost"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} rounded-full p-3`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="enrollments">Student Enrollments</TabsTrigger>
            <TabsTrigger value="messages">Contact Messages</TabsTrigger>
            <TabsTrigger value="courses">Manage Courses</TabsTrigger>
          </TabsList>

          {/* Enrollments Tab */}
          <TabsContent value="enrollments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Student Enrollments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {enrollments && enrollments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Time Slot</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Enrolled</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {enrollments.map((enrollment) => (
                          <TableRow key={enrollment.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="bg-primary/10 rounded-full p-2">
                                  <User className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{enrollment.name}</p>
                                  <p className="text-sm text-muted-foreground">{enrollment.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{enrollment.course}</Badge>
                            </TableCell>
                            <TableCell>Grade {enrollment.grade}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">{enrollment.timeSlot}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-sm">{enrollment.email}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-sm">{enrollment.phone}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">
                                  {format(new Date(enrollment.createdAt), 'MMM dd, yyyy')}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No enrollments yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Contact Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                {contactMessages && contactMessages.length > 0 ? (
                  <div className="space-y-4">
                    {contactMessages.map((message) => (
                      <Card key={message.id} className={`${!message.isRead ? 'border-primary/50' : ''}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 rounded-full p-2">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{message.name}</h4>
                                <p className="text-sm text-muted-foreground">{message.email}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(message.createdAt), 'MMM dd, yyyy')}
                              </p>
                              {!message.isRead && (
                                <Badge variant="default" className="mt-1">New</Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="font-medium text-foreground mb-1">
                              Subject: {message.subject}
                            </p>
                            <p className="text-muted-foreground">{message.message}</p>
                          </div>
                          
                          <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {message.email}
                              </div>
                              {message.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {message.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No messages yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Manage Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Course management functionality coming soon
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-2">Add New Course</h4>
                      <p className="text-sm text-muted-foreground">Create new course offerings</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-2">Edit Existing Courses</h4>
                      <p className="text-sm text-muted-foreground">Update course details and content</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
