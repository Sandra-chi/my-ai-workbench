import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Item = {
  id: string;
  title: string;
  subtitle?: string;
  href?: string;
};

type RecentSectionProps = {
  title: string;
  items: Item[];
};

export function RecentSection({ title, items }: RecentSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => {
          const content = (
            <div className="rounded-xl border border-border p-3 transition hover:bg-slate-50">
              <p className="text-sm font-medium">{item.title}</p>
              {item.subtitle ? <p className="mt-1 text-xs text-slate-500">{item.subtitle}</p> : null}
            </div>
          );

          return item.href ? (
            <Link key={item.id} href={item.href}>
              {content}
            </Link>
          ) : (
            <div key={item.id}>{content}</div>
          );
        })}
      </CardContent>
    </Card>
  );
}
