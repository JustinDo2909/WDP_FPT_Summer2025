import HowToUseDetailContent from "@/components/HowToUseDetailPage/HTUDContent";
import HowToUseDetailHeader from "@/components/HowToUseDetailPage/HTUDHeader";
import { Core, Container, Row, Column } from "@/lib/by/Div";
import { fetchPost } from "../seg";

export default async function HowToUseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await fetchPost(slug);

  return (
    <Core className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <HowToUseDetailHeader post={postData.post} />

        {/* Main Content Layout */}
        <Row className="flex flex-col lg:flex-row  gap-6 lg:gap-8 mt-8 lg:mt-12">
          {/* Main Content */}
          <Column className=" flex-col flex-1 min-w-0">
            <HowToUseDetailContent post={postData.post} />
          </Column>
          {/* Sidebar */}
        </Row>

        {/* Related Posts */}
        {/* <HowToUseRelatedPosts posts={relatedPosts} /> */}
      </Container>
    </Core>
  );
}
