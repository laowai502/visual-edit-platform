import Mock from 'mockjs';
import eQ from './editQues.mock';

Mock.setup({
    timeout: '350-600',
});

Mock.mock(/\/api\/getProject/, 'get', eQ.getProject);
