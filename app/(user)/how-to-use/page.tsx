import { Core, Container, Row, Column, RText, Section } from "@/lib/by/Div";
import HowToUsePostCard from "@/components/HowToUsePage/HowToUsePostCard";
import HowToUseSearchBar from "@/components/HowToUsePage/HowToUseSearchBar";
import Link from "next/link";
import { fetchPosts } from "./seg";

// Enhanced dummy data for skincare product guides


export default async function HowToUsePage() {
  const postData: PaginatedResponse<IPostData, "posts"> = await fetchPosts()

  return (
    <Core className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <Column className="mb-8 sm:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Skincare Product Usage Guide
          </h1>
          <RText className="text-base sm:text-lg text-gray-600 mx-auto px-4">
            Learn the proper techniques and application methods for your
            favorite skincare products
          </RText>
        </Column>

        {/* Search and Input Section */}
        <Row className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-4 sm:mb-12 gap-4 sm:gap-6">
          <HowToUseSearchBar />
        </Row>

        {/* Posts Grid - 3 Columns */}
        <Section className="bg-gray-100 rounded-2xl p-4 sm:p-6 lg:p-8">
          <Row className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8">
            {postData.posts.map((post) => (
              <Section
                key={post.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] min-w-0"
              >
                <Link href={`/how-to-use/${post.title.split(" ")[0]}`}>
                  <HowToUsePostCard post={post} />
                </Link>
              </Section>
            ))}
          </Row>
        </Section>
      </Container>
    </Core>
  );
}
