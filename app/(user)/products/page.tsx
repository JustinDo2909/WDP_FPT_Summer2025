import FloatingGameButton from "@/components/floating_game_button";
import { ProductsSearchComponent } from "@/components/ProductsPage/ProductSearchComponent";
import { Core, Container, Section, Area, Content } from "@/lib/by/Div";
import { ProductGrid } from "@/lib/pattern/share/ProductGrid";

export default function SearchPage() {
  return (
    <Core className="min-h-screen bg-background py-10">
      <Container className="max-w-7xl mx-auto px-4">
        <Section className="mb-8">
          <ProductsSearchComponent />
        </Section>

        <Area className="bg-muted rounded-xl shadow-sm">
          <Content className="mt-4">
            <ProductGrid />
            {/* todo: pass product list from parent */}
          </Content>
        </Area>
      </Container>
      <FloatingGameButton />
    </Core>
  );
}
