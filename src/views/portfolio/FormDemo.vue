<template>
  <div class="form-container">
    <div class="header-container">
      <h1 class="form-title">
        {{ t('portfolio.form.title') }}
        <span>{{ t('portfolio.form.subtitle') }}</span>
      </h1>
      <BackLink component="form" class="top-right-link" />
    </div>
    
    <div v-if="formSubmitted" class="form-success">
      <div class="success-icon">✓</div>
      <h2>{{ t('portfolio.form.success_title') }}</h2>
      <p>{{ t('portfolio.form.success_message') }}</p>
      <button @click="resetForm" class="btn-reset">{{ t('portfolio.form.new_submission') }}</button>
    </div>
    
    <form v-else class="contact-form" @submit.prevent="submitForm">
      <div class="form-section">
        <h2>{{ t('portfolio.form.personal_info') }}</h2>
        
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">{{ t('portfolio.form.first_name') }} *</label>
            <input 
              type="text" 
              id="firstName" 
              v-model="formData.firstName"
              :placeholder="t('portfolio.form.first_name_placeholder')"
              @blur="validateField('firstName')"
              :class="{ 'error': errors.firstName }"
            />
            <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
          </div>
          
          <div class="form-group">
            <label for="lastName">{{ t('portfolio.form.last_name') }} *</label>
            <input 
              type="text" 
              id="lastName" 
              v-model="formData.lastName"
              :placeholder="t('portfolio.form.last_name_placeholder')"
              @blur="validateField('lastName')"
              :class="{ 'error': errors.lastName }"
            />
            <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="email">{{ t('portfolio.form.email') }} *</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email"
            :placeholder="t('portfolio.form.email_placeholder')"
            @blur="validateField('email')"
            :class="{ 'error': errors.email }"
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
        
        <div class="form-group">
          <label for="phone">{{ t('portfolio.form.phone') }}</label>
          <input 
            type="tel" 
            id="phone" 
            v-model="formData.phone"
            :placeholder="t('portfolio.form.phone_placeholder')"
            @blur="validateField('phone')"
            :class="{ 'error': errors.phone }"
          />
          <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
        </div>
      </div>
      
      <div class="form-section">
        <h2>{{ t('portfolio.form.professional_info') }}</h2>
        
        <div class="form-group">
          <label for="occupation">{{ t('portfolio.form.occupation') }} *</label>
          <select 
            id="occupation" 
            v-model="formData.occupation"
            @blur="validateField('occupation')"
            :class="{ 'error': errors.occupation }"
          >
            <option value="">{{ t('portfolio.form.select_occupation') }}</option>
            <option value="developer">{{ t('portfolio.form.occupations.developer') }}</option>
            <option value="designer">{{ t('portfolio.form.occupations.designer') }}</option>
            <option value="manager">{{ t('portfolio.form.occupations.manager') }}</option>
            <option value="student">{{ t('portfolio.form.occupations.student') }}</option>
            <option value="other">{{ t('portfolio.form.occupations.other') }}</option>
          </select>
          <span v-if="errors.occupation" class="error-message">{{ errors.occupation }}</span>
        </div>
        
        <div v-if="formData.occupation === 'other'" class="form-group">
          <label for="otherOccupation">{{ t('portfolio.form.specify_occupation') }} *</label>
          <input 
            type="text" 
            id="otherOccupation" 
            v-model="formData.otherOccupation"
            :placeholder="t('portfolio.form.specify_occupation_placeholder')"
            @blur="validateField('otherOccupation')"
            :class="{ 'error': errors.otherOccupation }"
          />
          <span v-if="errors.otherOccupation" class="error-message">{{ errors.otherOccupation }}</span>
        </div>
        
        <div class="form-group">
          <label for="experience">{{ t('portfolio.form.experience') }} *</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" v-model="formData.experience" value="0-2" name="experience">
              0-2 {{ t('portfolio.form.years') }}
            </label>
            <label class="radio-label">
              <input type="radio" v-model="formData.experience" value="3-5" name="experience">
              3-5 {{ t('portfolio.form.years') }}
            </label>
            <label class="radio-label">
              <input type="radio" v-model="formData.experience" value="6-10" name="experience">
              6-10 {{ t('portfolio.form.years') }}
            </label>
            <label class="radio-label">
              <input type="radio" v-model="formData.experience" value="10+" name="experience">
              10+ {{ t('portfolio.form.years') }}
            </label>
          </div>
          <span v-if="errors.experience" class="error-message">{{ errors.experience }}</span>
        </div>
        
        <div class="form-group">
          <label>{{ t('portfolio.form.skills') }} *</label>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.skills" value="html">
              HTML/CSS
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.skills" value="javascript">
              JavaScript
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.skills" value="vue">
              Vue.js
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.skills" value="react">
              React
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.skills" value="backend">
              Backend
            </label>
          </div>
          <span v-if="errors.skills" class="error-message">{{ errors.skills }}</span>
        </div>
      </div>
      
      <div class="form-section">
        <h2>{{ t('portfolio.form.additional_info') }}</h2>
        
        <div class="form-group">
          <label for="message">{{ t('portfolio.form.message') }}</label>
          <textarea 
            id="message" 
            v-model="formData.message"
            :placeholder="t('portfolio.form.message_placeholder')"
            rows="5"
          ></textarea>
        </div>
        
        <div class="form-group checkbox-single">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              v-model="formData.termsAccepted"
              @change="validateField('termsAccepted')"
            >
            <span>{{ t('portfolio.form.terms') }}</span>
          </label>
          <span v-if="errors.termsAccepted" class="error-message">{{ errors.termsAccepted }}</span>
        </div>
      </div>
      
      <div class="form-actions">
        <button type="button" @click="resetForm" class="btn-secondary">{{ t('portfolio.form.reset') }}</button>
        <button type="submit" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="spinner"></span>
          {{ isSubmitting ? t('portfolio.form.submitting') : t('portfolio.form.submit') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import BackLink from "@/components/common/BackLink.vue";

// 添加一个表单数据接口
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  occupation: string;
  otherOccupation: string;
  experience: string;
  skills: string[]; // 字符串数组类型
  message: string;
  termsAccepted: boolean; // 布尔值类型
}

const { t } = useI18n();

// 使用接口定义表单数据
const formData = reactive<FormData>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  occupation: '',
  otherOccupation: '',
  experience: '',
  skills: [],
  message: '',
  termsAccepted: false
});

// 表单验证错误
const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  occupation: '',
  otherOccupation: '',
  experience: '',
  skills: '',
  termsAccepted: ''
});

const isSubmitting = ref(false);
const formSubmitted = ref(false);

// 验证单个字段
const validateField = (field: string) => {
  errors[field as keyof typeof errors] = '';
  
  switch(field) {
    case 'firstName':
      if (!formData.firstName.trim()) {
        errors.firstName = t('portfolio.form.validation.required');
      }
      break;
    case 'lastName':
      if (!formData.lastName.trim()) {
        errors.lastName = t('portfolio.form.validation.required');
      }
      break;
    case 'email':
      if (!formData.email.trim()) {
        errors.email = t('portfolio.form.validation.required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = t('portfolio.form.validation.email');
      }
      break;
    case 'phone':
      if (formData.phone && !/^\+?[0-9\s\-()]{6,20}$/.test(formData.phone)) {
        errors.phone = t('portfolio.form.validation.phone');
      }
      break;
    case 'occupation':
      if (!formData.occupation) {
        errors.occupation = t('portfolio.form.validation.required');
      }
      break;
    case 'otherOccupation':
      if (formData.occupation === 'other' && !formData.otherOccupation.trim()) {
        errors.otherOccupation = t('portfolio.form.validation.required');
      }
      break;
    case 'experience':
      if (!formData.experience) {
        errors.experience = t('portfolio.form.validation.required_selection');
      }
      break;
    case 'skills':
      if (formData.skills.length === 0) {
        errors.skills = t('portfolio.form.validation.required_selection');
      }
      break;
    case 'termsAccepted':
      if (!formData.termsAccepted) {
        errors.termsAccepted = t('portfolio.form.validation.terms');
      }
      break;
  }
};

// 验证整个表单
const validateForm = () => {
  let isValid = true;
  
  // 验证必填字段
  ['firstName', 'lastName', 'email', 'occupation', 'experience', 'skills', 'termsAccepted'].forEach(field => {
    validateField(field);
    if (errors[field as keyof typeof errors]) {
      isValid = false;
    }
  });
  
  // 验证其他职业
  if (formData.occupation === 'other') {
    validateField('otherOccupation');
    if (errors.otherOccupation) {
      isValid = false;
    }
  }
  
  return isValid;
};

// 提交表单
const submitForm = async () => {
  if (!validateForm()) {
    // 滚动到第一个错误
    const firstError = document.querySelector('.error-message');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 在实际应用中，这里会调用真实的API
    // const response = await fetch('/api/submit-form', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
    
    // if (!response.ok) throw new Error('提交失败');
    
    formSubmitted.value = true;
  } catch (error) {
    console.error('表单提交错误:', error);
    // 显示提交错误
    alert(t('portfolio.form.submission_error'));
  } finally {
    isSubmitting.value = false;
  }
};

// 重置表单
const resetForm = () => {
  // 使用类型安全的方式重置表单
  Object.assign(formData, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    occupation: '',
    otherOccupation: '',
    experience: '',
    skills: [] as string[],
    message: '',
    termsAccepted: false
  });
  // 清空错误消息
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  formSubmitted.value = false;
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.form-container {
  max-width: 800px;
  margin: 2rem auto;
  background: var(--form-bg);
  color: var(--form-text-color);
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px); /* 调整高度以适应固定头尾 */
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  position: relative;
}

.form-title {
  font-weight: normal;
  font-size: 2.2rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--form-title-border);
  color: inherit;
  transition: border-color 0.3s ease;
  flex: 1;
  
  span {
    display: block;
    font-size: 0.9rem;
    margin-bottom: 0.7rem;
    margin-left: 3px;
    margin-top: 0.2rem;
    opacity: 0.8;
  }
}

.top-right-link {
  margin-top: 0.5rem;
  margin-bottom: 0;
  margin-left: 1rem;
}

.form-section {
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
    font-weight: 500;
    color: inherit;
  }
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  .form-group {
    flex: 1;
  }
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
  }
}

.form-group {
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--form-label-color);
    font-weight: 500;
  }
}

input[type="text"],
input[type="email"],
input[type="tel"],
select,
textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--form-input-border);
  border-radius: 4px;
  background: var(--form-input-bg);
  color: var(--form-input-text);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--form-input-focus-border);
    box-shadow: 0 0 0 3px rgba(var(--form-input-focus-border), 0.25);
  }
  
  &.error {
    border-color: var(--form-error-color);
  }
  
  &::placeholder {
    color: var(--form-input-text);
    opacity: 0.6;
  }
}

.error-message {
  color: var(--form-error-color);
  font-size: 0.8rem;
  margin-top: 0.3rem;
  display: block;
}

.checkbox-group,
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}

.checkbox-label,
.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-right: 1rem;
  
  input {
    margin-right: 0.5rem;
  }
}

.checkbox-single {
  .checkbox-label {
    font-weight: normal;
    color: var(--form-text-color);
  }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  
  button {
    padding: 0.8rem 2rem;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    font-size: 1rem;
    position: relative;
    
    &:hover {
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &[type="submit"] {
      background-color: var(--form-button-bg);
      color: var(--form-button-text);
      border: none;
      
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
    
    &.btn-secondary {
      background-color: transparent;
      border: 1px solid var(--form-input-border);
      color: var(--form-text-color);
    }
  }
}

.form-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  animation: fadeIn 0.5s ease;
  
  .success-icon {
    font-size: 4rem;
    color: var(--form-success-color);
    background-color: rgba(var(--form-success-color), 0.1);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
    font-size: 1.1rem;
    opacity: 0.9;
  }
  
  .btn-reset {
    padding: 0.8rem 2rem;
    background-color: var(--form-button-bg);
    color: var(--form-button-text);
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
}

.spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@media (max-width: $breakpoint-md) {
  .form-container {
    padding: 1.5rem;
    height: auto;
    margin: 1rem;
  }
  
  .form-title {
    font-size: 1.8rem;
  }
}
</style>