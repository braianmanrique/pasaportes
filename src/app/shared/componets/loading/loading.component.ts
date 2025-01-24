import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingService } from '../../../services/shared/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  isLoading$ = this.loadingService.loading$;
  constructor(private loadingService: LoadingService,  private cdr: ChangeDetectorRef) {
    this.isLoading$.subscribe((loading) => {
      console.log('LoadingComponent: isLoading$ value changed to', loading);
      this.cdr.detectChanges();
    });
  }
}
