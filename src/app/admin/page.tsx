import { isAuthenticated } from "@/lib/auth";
import { getProjects, getBlogPosts } from "@/lib/contentStore";
import AdminLogin from "./AdminLogin";
import AdminConsole from "./AdminConsole";

export const metadata = {
  title: "ADMIN // CYBER_MATRIX",
  description: "Secure content administration matrix",
};

export default async function AdminPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return <AdminLogin />;
  }

  const projects = await getProjects();
  const posts = await getBlogPosts();

  return <AdminConsole initialProjects={projects} initialPosts={posts} />;
}
