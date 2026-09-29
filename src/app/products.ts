export interface Product {
  id: number;
  name: string;
  category: string;
  price: number; // INR, placeholder prices
  description: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Ashwagandha Advance by Organic India', category: 'Stress and sleep', price: 449, description: '60 veg capsules with 5% withanolides, from Organic India.', image: 'assets/img/ashwagandha-advance.jpg' },
  { id: 2, name: 'Triphala Churna by Baba Mastnath Ayurved', category: 'Digestion', price: 249, description: '100 g classical Ayurvedic triphala powder, from Baba Mastnath Ayurved.', image: 'assets/img/triphala-churna.jpg' },
  { id: 3, name: 'Chawanprash by Amrutam', category: 'Immunity', price: 399, description: 'Ancient Ayurvedic recipe for daily use, from Amrutam.', image: 'assets/img/chawanprash.jpg' },
  { id: 4, name: 'Kumkumadi Oil by Kerala Ayurveda', category: 'Skin and hair', price: 799, description: 'Traditional Ayurvedic kumkumadi oil in a dropper bottle, from Kerala Ayurveda.', image: 'assets/img/kumkumadi-oil.jpg' },
  { id: 5, name: 'Brahmi Oil by Sparshveda', category: 'Skin and hair', price: 349, description: '120 ml pure carrier oil for all skin and hair types, from Sparshveda.', image: 'assets/img/brahmi-oil.jpg' },
  { id: 6, name: 'Tulsi Ginger Tea by Organic India', category: 'Immunity', price: 199, description: 'Certified organic, caffeine-free tulsi ginger tea, from Organic India.', image: 'assets/img/tulsi-ginger-tea.jpg' },
  { id: 7, name: 'Aswagandharishta by Kerala Ayurveda', category: 'Stress and sleep', price: 399, description: '450 ml classical Ayurvedic tonic with ashwagandha, from Kerala Ayurveda.', image: 'assets/img/aswagandharishta.jpg' },
];
