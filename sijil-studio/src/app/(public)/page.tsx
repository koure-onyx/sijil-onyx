import { PageContainer, PageHeader, StatCard } from "@/components/shared";
import { platformService } from "@/features/platform/services/platform.service";

export default async function HomePage() {
  const stats = await platformService.stats();

  return (
    <PageContainer>
      <PageHeader
        title="Sijil"
        description="Frontend Foundation Ready"
      />

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Users"
          value={stats.users}
        />

        <StatCard
          title="Documents"
          value={stats.documents}
        />

        <StatCard
          title="Certificates"
          value={stats.certificates}
        />
      </div>
    </PageContainer>
  );
}
