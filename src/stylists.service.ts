import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylistsService {
  private getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part[0])
      .join('');
  }
  
  private getPlaceholderImage(name: string): string {
    const initials = this.getInitials(name);
    return `https://placehold.co/400x400/e9e9e9/4a4a4a.png?text=${initials}&font-size=40`;
  }
  
  private stylists = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Senior Stylist',
      specialty: "Women's Haircuts and Color",
      experience: 8,
      image: this.getPlaceholderImage('Sarah Johnson'),
      certifications: [
        'Paul Mitchell Color Specialist',
        'Balayage Expert Certification',
        'Advanced Cutting Techniques'
      ],
      bio: 'Sarah specializes in creating beautiful, natural-looking color and modern cuts that enhance her clients\' features. With 8 years of experience, she stays current with the latest trends while ensuring each style is personalized to the individual.',
      services: ["Women's Haircuts and Trims", 'Coloring Services']
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Master Barber',
      specialty: "Men's Cuts and Styling",
      experience: 12,
      image: this.getPlaceholderImage('Michael Chen'),
      certifications: [
        'Master Barber License',
        'Advanced Fade Techniques',
        'Traditional Straight Razor Shaving'
      ],
      bio: 'Michael brings over a decade of experience in precision cutting and modern barbering techniques. He\'s known for his attention to detail and ability to create both classic and contemporary styles.',
      services: ["Men's Haircuts and Trims"]
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Style Specialist',
      specialty: 'Special Event Styling',
      experience: 6,
      image: this.getPlaceholderImage('Emily Rodriguez'),
      certifications: [
        'Bridal Hair Specialist',
        'Advanced Styling Techniques',
        'Editorial Styling'
      ],
      bio: 'Emily excels in creating stunning styles for special occasions. Her creative approach and technical expertise make her the go-to stylist for weddings, photoshoots, and special events.',
      services: ['Styling', "Women's Haircuts and Trims"]
    },
    {
      id: 4,
      name: 'David Thompson',
      title: 'Color Expert',
      specialty: 'Hair Color and Highlights',
      experience: 10,
      image: this.getPlaceholderImage('David Thompson'),
      certifications: [
        'Advanced Color Certification',
        'Balayage Master',
        'Color Correction Specialist'
      ],
      bio: 'David is passionate about creating stunning, personalized color transformations. His expertise in color theory and application techniques ensures clients receive the perfect shade for their skin tone and lifestyle.',
      services: ['Coloring Services', "Women's Haircuts and Trims"]
    },
    {
      id: 5,
      name: 'Jessica Kim',
      title: 'Senior Stylist',
      specialty: 'Precision Cutting',
      experience: 9,
      image: this.getPlaceholderImage('Jessica Kim'),
      certifications: [
        'Vidal Sassoon Cutting Techniques',
        'Texture Expert',
        'Advanced Styling Certification'
      ],
      bio: 'Jessica combines technical precision with artistic vision to create perfectly balanced cuts that enhance each client\'s unique features. Her expertise in texturizing and layering techniques helps clients achieve their desired look.',
      services: ["Women's Haircuts and Trims", "Men's Haircuts and Trims"]
    },
    {
      id: 6,
      name: 'Marcus Wilson',
      title: 'Barber Specialist',
      specialty: 'Classic Barbering',
      experience: 15,
      image: this.getPlaceholderImage('Marcus Wilson'),
      certifications: [
        'Master Barber Certification',
        'Classic Shaving Specialist',
        'Men\'s Grooming Expert'
      ],
      bio: 'Marcus is a third-generation barber who combines traditional techniques with modern styling. His expertise in classic cuts and hot towel shaves provides clients with an authentic barbershop experience.',
      services: ["Men's Haircuts and Trims"]
    },
    {
      id: 7,
      name: 'Sofia Martinez',
      title: 'Creative Director',
      specialty: 'Avant-Garde Styling',
      experience: 11,
      image: this.getPlaceholderImage('Sofia Martinez'),
      certifications: [
        'Editorial Styling Master',
        'Platform Artist',
        'Advanced Color Design'
      ],
      bio: 'Sofia\'s creative vision and technical expertise make her a sought-after stylist for both everyday looks and special occasions. Her work has been featured in fashion shows and magazines.',
      services: ['Styling', 'Coloring Services', "Women's Haircuts and Trims"]
    },
    {
      id: 8,
      name: 'James Parker',
      title: 'Style Director',
      specialty: 'Modern Men\'s Styling',
      experience: 7,
      image: this.getPlaceholderImage('James Parker'),
      certifications: [
        'Advanced Men\'s Cutting',
        'Texture Expert',
        'Modern Barbering Techniques'
      ],
      bio: 'James specializes in contemporary men\'s styles, combining traditional barbering with modern techniques. His attention to detail and understanding of current trends helps clients achieve their perfect look.',
      services: ["Men's Haircuts and Trims", 'Styling']
    }
  ];

  getStylistsByService(service: string) {
    return this.stylists.filter(stylist => 
      stylist.services.includes(service)
    );
  }

  getAllStylists() {
    return this.stylists;
  }
}