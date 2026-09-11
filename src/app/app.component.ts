import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  activeView = 'inicio';
  submitted = false;
  petSaved = false;
  clientSaved = false;
  registeredPets = 0;
  registeredClients = 0;
  pendingAdoptions = 6;
  shopCategories = ['Todo', 'Alimentos', 'Juguetes', 'Accesorios', 'Higiene'];
  selectedCategory = 'Todo';
  shopProducts = [
    { name: 'Alimento premium para perro', category: 'Alimentos', price: 89.90, image: 'https://loremflickr.com/640/480/dog,food?lock=21' },
    { name: 'Kit de juego para gatos', category: 'Juguetes', price: 45.50, image: 'https://loremflickr.com/640/480/cat,toy?lock=22' },
    { name: 'Correa urbana reflectiva', category: 'Accesorios', price: 32.00, image: 'https://loremflickr.com/640/480/dog,collar?lock=23' },
    { name: 'Cama acolchada confort', category: 'Accesorios', price: 119.90, image: 'https://loremflickr.com/640/480/pet,bed?lock=24' },
    { name: 'Shampoo suave para mascotas', category: 'Higiene', price: 28.90, image: 'https://loremflickr.com/640/480/dog,bath?lock=25' },
    { name: 'Snacks naturales de pollo', category: 'Alimentos', price: 24.90, image: 'https://loremflickr.com/640/480/dog,treats?lock=26' }
  ];
  pet = { name: '', species: '', breed: '', age: null as number | null, sex: '' };
  client = { firstName: '', lastName: '', dni: '', phone: '', email: '', address: '' };
  species = ['Perro', 'Gato', 'Ave', 'Otro'];
  adoptionForm = this.formBuilder.group({
    client: ['', Validators.required],
    pet: ['', Validators.required],
    date: ['', Validators.required],
    reason: ['', Validators.required],
    home: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    notes: ['']
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {
    const routeView = this.router.url.split('/')[1];
    if (routeView) this.activeView = routeView;
  }

  navigate(view: string): void {
    this.activeView = view;
    this.router.navigate([view]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectShopCategory(category: string): void {
    this.selectedCategory = category;
  }

  get visibleProducts() {
    return this.selectedCategory === 'Todo'
      ? this.shopProducts
      : this.shopProducts.filter(product => product.category === this.selectedCategory);
  }

  savePet(form: { valid: boolean | null }): void {
    if (form.valid) {
      this.petSaved = true;
      this.registeredPets++;
    }
  }

  saveClient(form: { valid: boolean | null }): void {
    if (form.valid) {
      this.clientSaved = true;
      this.registeredClients++;
    }
  }

  submitAdoption(): void {
    this.submitted = true;
    if (this.adoptionForm.valid) {
      this.adoptionForm.reset();
      this.pendingAdoptions++;
      this.submitted = false;
      alert('Solicitud enviada correctamente.');
    }
  }

  invalid(control: string): boolean {
    const field = this.adoptionForm.get(control);
    return !!field && field.invalid && (field.touched || this.submitted);
  }
}
