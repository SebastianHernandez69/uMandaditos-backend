import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResponseDto } from './dto/post-response.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  
  @Public()
  @Get('id/:id')
  async getPostById(@Param('id') id: number): Promise<ResponseDto<PostResponseDto>> {
    return {
        data: await this.postService.getPostById(+id),
        message: 'Post found successfully',
        success: true
    };
  }

  @Get('user')
  async getAllPostsByUserId(@Req() req: AuthenticatedRequest): Promise<ResponseDto<PostResponseDto[]>> {
    return {
        data: await this.postService.getAllPostsByUserId(req.user.uid),
        message: 'Posts found successfully',
        success: true
    };
  }

  @Post()
  async createPost(@Body() data: CreatePostDto, @Req() req: AuthenticatedRequest): Promise<ResponseDto<PostResponseDto>> {
    return {
        data: await this.postService.createPost(data, req.user.uid),
        message: 'Post created successfully',
        success: true
    };
  }

  @Public()
  @Get('near/:locationId')
  async getAllPostsNear(@Param('locationId') locationId: number): Promise<ResponseDto<PostResponseDto[]>> {
    return {
        data: await this.postService.getAllPostsNear(+locationId),
        message: 'Posts found successfully',
        success: true
    };
  }

  @Public()
  @Get('location/:locationId')
  async getPostsByLocationId(@Param('locationId') locationId: number): Promise<ResponseDto<PostResponseDto[]>> {
    return {
        data: await this.postService.getPostsByLocationId(+locationId),
        message: 'Posts found successfully',
        success: true
    };
  }

  @Get('count')
  async getPostCount(@Req() req: AuthenticatedRequest): Promise<ResponseDto<number>> {
    return {
        data: await this.postService.getPostCount(req.user.uid),
        message: 'Post count found successfully',
        success: true
    };
  }

  @Get('active')
  async getActivePostsByUserId(@Req() req: AuthenticatedRequest): Promise<ResponseDto<PostResponseDto[]>> {
    return {
        data: await this.postService.getActivePostsByUserId(req.user.uid),
        message: 'Active posts found successfully',
        success: true
    };
  }

  @Public()
  @Patch('incourse/:postId')
  async markPostAsIncourse(@Param('postId') postId: number): Promise<void> {
    await this.postService.markPostAsIncourse(+postId);
  }

  @Public()
  @Patch('finished/:postId')
  async markPostAsFinished(@Param('postId') postId: number): Promise<void> {
    await this.postService.markPostAsFinished(+postId);
  }
}
