import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPlacholderComponent } from './chat-placholder.component';

describe('ChatPlacholderComponent', () => {
  let component: ChatPlacholderComponent;
  let fixture: ComponentFixture<ChatPlacholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPlacholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPlacholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
