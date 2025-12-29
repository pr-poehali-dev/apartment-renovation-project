import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const [calcData, setCalcData] = useState({
    area: 60,
    repairType: "standart",
    rooms: 2,
    smartHome: false,
    furniture: false,
    fastRepair: false
  });

  const calculatePrice = () => {
    let basePrice = 0;
    
    switch(calcData.repairType) {
      case "cosmetic":
        basePrice = 8000;
        break;
      case "standart":
        basePrice = 12000;
        break;
      case "premium":
        basePrice = 18000;
        break;
    }

    let totalPrice = basePrice * calcData.area;

    if (calcData.smartHome) totalPrice += calcData.area * 8000;
    if (calcData.furniture) totalPrice += 150000;
    if (calcData.fastRepair) totalPrice += totalPrice * 0.15;

    const discount = totalPrice * 0.15;
    const finalPrice = totalPrice - discount;

    return { totalPrice, discount, finalPrice };
  };

  const prices = calculatePrice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", phone: "", message: "" });
  };

  const services = [
    {
      icon: "Home",
      title: "Современный ремонт",
      description: "Минималистичный дизайн с акцентом на функциональность и простоту форм",
      price: "от 12 000 ₽/м²"
    },
    {
      icon: "Lightbulb",
      title: "Умный дом",
      description: "Интеграция современных технологий для комфортной жизни",
      price: "от 8 000 ₽/м²"
    },
    {
      icon: "Sofa",
      title: "Мебель на заказ",
      description: "Встроенная мебель по индивидуальным размерам",
      price: "от 25 000 ₽"
    },
    {
      icon: "Sparkles",
      title: "Быстрый ремонт",
      description: "Качественный ремонт в сжатые сроки без потери качества",
      price: "от 10 000 ₽/м²"
    }
  ];

  const reviews = [
    {
      name: "Анна Волкова",
      text: "Сделали ремонт быстро и качественно! Особенно порадовали цены - намного доступнее, чем у конкурентов.",
      rating: 5
    },
    {
      name: "Дмитрий Козлов",
      text: "Современный стильный дизайн за разумные деньги. Ребята - профессионалы своего дела!",
      rating: 5
    },
    {
      name: "Мария Новикова",
      text: "Отличное соотношение цена-качество. Рекомендую всем друзьям и знакомым!",
      rating: 5
    }
  ];

  const handleDownloadPrice = () => {
    const priceText = `
ДОСТУПНЫЕ ЦЕНЫ НА РЕМОНТ
========================

КОМПЛЕКСНЫЙ РЕМОНТ
- Черновая отделка: от 4 500 ₽/м²
- Чистовая отделка: от 8 000 ₽/м²
- Ремонт "под ключ": от 12 000 ₽/м²

СОВРЕМЕННЫЕ РЕШЕНИЯ
- Умный дом (базовый): от 8 000 ₽/м²
- Встроенная мебель: от 25 000 ₽
- LED-освещение: от 1 500 ₽/м²

ОТДЕЛЬНЫЕ УСЛУГИ
- Электромонтаж: от 800 ₽/точка
- Сантехника: от 1 500 ₽/точка
- Укладка плитки: от 1 200 ₽/м²
- Ламинат: от 500 ₽/м²
- Покраска стен: от 350 ₽/м²

Скидка 15% при заказе до конца месяца!

Контакты: +7 (999) 494-78-80
Email: remont@example.com
    `;
    
    const blob = new Blob([priceText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'price-list.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadEstimate = () => {
    const estimateText = `
ПРИМЕРНАЯ СМЕТА НА СОВРЕМЕННЫЙ РЕМОНТ
=====================================

ОБЪЕКТ: Квартира 60 м²
СТИЛЬ: Современный минимализм
СРОК: 2 месяца

ДЕМОНТАЖНЫЕ РАБОТЫ                    32 000 ₽
ЭЛЕКТРОМОНТАЖНЫЕ РАБОТЫ              58 000 ₽
САНТЕХНИЧЕСКИЕ РАБОТЫ                48 000 ₽
ШТУКАТУРНЫЕ РАБОТЫ                   72 000 ₽
МАЛЯРНЫЕ РАБОТЫ                      54 000 ₽
НАПОЛЬНЫЕ ПОКРЫТИЯ                   84 000 ₽
ПОТОЛКИ                              36 000 ₽
ДВЕРИ                                65 000 ₽

МАТЕРИАЛЫ (СОВРЕМЕННЫЕ)             280 000 ₽

────────────────────────────────────
ИТОГО:                             729 000 ₽

СКИДКА 15% (до конца месяца):     -109 350 ₽

ИТОГО К ОПЛАТЕ:                    619 650 ₽

* Рассрочка без переплат до 12 месяцев
* Точная смета после бесплатного замера

Контакты: +7 (999) 494-78-80
    `;
    
    const blob = new Blob([estimateText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'estimate.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-border">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-serif font-bold text-primary">Современный Ремонт</div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#services" className="hover:text-accent transition-colors">Услуги</a>
            <a href="#about" className="hover:text-accent transition-colors">О нас</a>
            <a href="#reviews" className="hover:text-accent transition-colors">Отзывы</a>
            <a href="#contact" className="hover:text-accent transition-colors">Контакты</a>
            <Button className="bg-accent hover:bg-accent/90 text-white">
              <Icon name="Phone" className="mr-2" size={18} />
              +7 (999) 494-78-80
            </Button>
          </div>
          <Button variant="ghost" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </nav>
      </header>

      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🔥 Скидка 15% до конца месяца
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                Ремонт квартир<br />в современном стиле
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Стильные интерьеры по доступным ценам
              </p>
              <p className="text-2xl font-bold text-accent mb-8">
                Цены вас приятно удивят!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg">
                  <Icon name="Calculator" className="mr-2" size={20} />
                  Узнать цену
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  <Icon name="ImageIcon" className="mr-2" size={20} />
                  Примеры работ
                </Button>
              </div>
              <div className="mt-8 flex gap-8">
                <div>
                  <div className="text-3xl font-serif font-bold text-primary">300+</div>
                  <div className="text-sm text-muted-foreground">выполненных проектов</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-primary">10</div>
                  <div className="text-sm text-muted-foreground">лет на рынке</div>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <img 
                src="https://cdn.poehali.dev/projects/3c04a34c-a3f4-4d37-b9e4-e525b55e7f9d/files/49f89deb-4d5b-406b-980f-482c0c04f8f6.jpg"
                alt="Современный ремонт"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl">
                <div className="text-4xl font-serif font-bold text-accent">от 12К</div>
                <div className="text-sm text-muted-foreground">₽ за м²</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Современные решения для вашего комфорта
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={service.icon} className="text-accent" size={28} />
                  </div>
                  <CardTitle className="font-serif text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-serif font-bold text-accent">{service.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" onClick={handleDownloadPrice} className="border-accent text-accent hover:bg-accent hover:text-white">
              <Icon name="Download" className="mr-2" size={20} />
              Скачать прайс-лист
            </Button>
            <Button variant="outline" size="lg" onClick={handleDownloadEstimate} className="border-accent text-accent hover:bg-accent hover:text-white">
              <Icon name="FileText" className="mr-2" size={20} />
              Скачать пример сметы
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img 
                src="https://cdn.poehali.dev/projects/3c04a34c-a3f4-4d37-b9e4-e525b55e7f9d/files/cb67d0e9-9df3-40d9-b03c-bd41aa4b3976.jpg"
                alt="Современные материалы"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Почему мы?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Мы создаем современные интерьеры, которые радуют глаз и не бьют по карману. Наш подход - максимум качества за разумные деньги.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Percent" className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Доступные цены</h3>
                    <p className="text-muted-foreground">Работаем без посредников, поэтому наши цены на 30% ниже рыночных</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Быстрые сроки</h3>
                    <p className="text-muted-foreground">Гарантируем соблюдение сроков без потери качества работ</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Shield" className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Гарантия 3 года</h3>
                    <p className="text-muted-foreground">Предоставляем гарантию на все виды работ с договорным закреплением</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="CreditCard" className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Рассрочка 0%</h3>
                    <p className="text-muted-foreground">Предлагаем рассрочку до 12 месяцев без процентов и переплат</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-muted-foreground">Довольные клиенты - наша лучшая реклама</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-accent fill-accent" size={18} />
                    ))}
                  </div>
                  <CardTitle className="font-serif text-lg">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Специальное предложение
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Скидка 15% на все виды работ при заказе до конца месяца + бесплатный дизайн-проект в подарок!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg">
                <Icon name="Gift" className="mr-2" size={20} />
                Получить скидку
              </Button>
              <Button size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-accent">
                <Icon name="Calculator" className="mr-2" size={20} />
                Рассчитать стоимость
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Свяжитесь с нами</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Оставьте заявку, и мы перезвоним в течение 10 минут для бесплатной консультации и расчета точной стоимости.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Phone" className="text-accent" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold">Телефон</div>
                    <div className="text-muted-foreground">+7 (999) 494-78-80</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Mail" className="text-accent" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">remont@example.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" className="text-accent" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold">Адрес</div>
                    <div className="text-muted-foreground">Ростов-на-Дону, ул. Стачки, 34</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" className="text-accent" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold">Режим работы</div>
                    <div className="text-muted-foreground">Пн-Вс: 9:00 - 21:00</div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <img 
                  src="https://cdn.poehali.dev/projects/3c04a34c-a3f4-4d37-b9e4-e525b55e7f9d/files/1d0a3dc1-6daf-418c-8135-7046874e33fd.jpg"
                  alt="Наши работы"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Получить расчет стоимости</CardTitle>
                <CardDescription className="text-base">Заполните форму - перезвоним за 10 минут</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <Input 
                      placeholder="Как вас зовут?"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <Input 
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Что планируете сделать?</label>
                    <Textarea 
                      placeholder="Кратко опишите, какой ремонт вам нужен..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-white">
                    <Icon name="Send" className="mr-2" size={20} />
                    Получить расчет
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-serif font-bold mb-4">Современный Ремонт</div>
              <p className="text-sm opacity-80">Качественный ремонт по доступным ценам</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Современный ремонт</li>
                <li>Умный дом</li>
                <li>Мебель на заказ</li>
                <li>Быстрый ремонт</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>О нас</li>
                <li>Примеры работ</li>
                <li>Отзывы</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>+7 (999) 494-78-80</li>
                <li>remont@example.com</li>
                <li>Ростов-на-Дону, ул. Стачки, 34</li>
                <li>Пн-Вс: 9:00 - 21:00</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-80">
            © 2024 Современный Ремонт. Все права защищены.
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <a 
          href="https://wa.me/79994947880" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          aria-label="Написать в WhatsApp"
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-8 h-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="absolute right-full mr-3 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Написать в WhatsApp
          </span>
        </a>

        <a 
          href="https://t.me/remontkvartirostovondon" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-16 h-16 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          aria-label="Написать в Telegram"
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-8 h-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.48 1.02-.73 3.99-1.73 6.65-2.87 7.98-3.42 3.8-1.58 4.59-1.85 5.1-1.86.11 0 .37.03.53.16.14.11.18.26.2.37.01.08.03.29.01.45z"/>
          </svg>
          <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            1
          </span>
          <span className="absolute right-full mr-3 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Напишите нам в Telegram
          </span>
        </a>
      </div>
    </div>
  );
};

export default Index;