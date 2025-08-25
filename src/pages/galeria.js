export default function Galeria() {
  const imgs = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  ];
  return `
    <section class="space-y-6">
      <h1 class="text-2xl md:text-3xl font-bold">Galería</h1>
      <p class="text-gray-500">Explora momentos del bootcamp</p>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${imgs.map(src => `
          <figure class="overflow-hidden rounded-xl border bg-white">
            <img src="${src}" class="h-48 w-full object-cover hover:scale-105 transition"/>
          </figure>
        `).join("")}
      </div>
    </section>
  `;
}
